[← 返回主技术说明文档](../全文检索服务构建与学习文档.md)

# Sidecar 伴生微服务模式、离线 NMT 模型懒加载与超时调优规范

本文档阐述 Sidecar 伴生微服务模式的技术定义、基于本地 CTranslate2 / LibreTranslate 离线 NMT 推理引擎的集成机制，以及 CPU 懒加载冷启动下的超时调优策略。

---

## 1. 核心概念规范

### 1.1 Sidecar (伴生微服务模式)
微服务架构中的经典解耦设计模式。在主微服务进程旁边独立部署一个伴生容器（Sidecar）。主服务通过本地 HTTP API 与伴生容器通信，既利用了非 Java 语言（Python/C++）在 AI 推理领域的生态优势，又避免了底层 C++ 崩溃导致 JVM 主进程终止。

---

## 2. 架构方案对比：JNI 嵌入式 vs Sidecar 模式

*   **路线 A：Java 进程嵌入式加载 (JNI / ONNX / DJL)**：
    在 Java 进程内部通过 JNI 调用 C++ 动态链接库。C++ 底层的内存泄漏或段错误（`SIGSEGV`）会直接导致整个 Java 进程崩塌；同时第三方二进制库拖慢 Java 编译与 CI/CD 构建。
*   **路线 B：Sidecar 伴生模式 (本项目采用)**：
    离线 NMT 推理引擎独立打包为 Docker 容器（`yudao-translate`），运行在 `127.0.0.1:5000`。两进程高度解耦，Classpath 保持干净。

---

## 3. 配置属性管理类 [TranslateProperties.java](../../yudao-module-search/yudao-module-search-server/src/main/java/cn/iocoder/yudao/module/search/framework/config/TranslateProperties.java) 规范

```java
package cn.iocoder.yudao.module.search.framework.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Component
@ConfigurationProperties("yudao.translate")
@Data
@Validated
public class TranslateProperties {

    @NotEmpty(message = "翻译服务 API 地址不能为空")
    private String apiUrl = "http://127.0.0.1:5000/translate";

    @NotNull(message = "翻译服务超时时间不能为空")
    private Integer timeout = 30000; // 默认 30 秒 (30000 毫秒)
}
```

*   `@ConfigurationProperties("yudao.translate")`：完成属性自动绑定。
*   `@Validated` + `@NotEmpty` / `@NotNull`：开启 JSR-303 参数合法性校验，启动期拦截空配置。

---

## 4. 翻译实现类 [TranslationServiceImpl.java](../../yudao-module-search/yudao-module-search-server/src/main/java/cn/iocoder/yudao/module/search/service/TranslationServiceImpl.java) 规范

```java
@Service
@Slf4j
public class TranslationServiceImpl implements TranslationService {

    @Resource
    private TranslateProperties translateProperties;

    @Override
    public String translate(String text, String sourceLang, String targetLang) {
        if (StrUtil.isBlank(text)) {
            return "";
        }
        if (StrUtil.equalsIgnoreCase(sourceLang, targetLang)) {
            return text;
        }

        try {
            Map<String, Object> paramMap = new HashMap<>();
            paramMap.put("q", text);
            paramMap.put("source", convertLanguageCode(sourceLang));
            paramMap.put("target", convertLanguageCode(targetLang));
            paramMap.put("format", "text");

            String jsonResult = HttpUtil.post(translateProperties.getApiUrl(), paramMap, translateProperties.getTimeout());
            if (StrUtil.isBlank(jsonResult)) {
                throw new RuntimeException("Empty response from local translation engine");
            }

            return JSONUtil.parseObj(jsonResult).getStr("translatedText");
        } catch (Exception e) {
            log.error("[TranslationService] 本地离线翻译服务调用异常，接口地址: {}, 原因: {}", translateProperties.getApiUrl(), e.getMessage());
            throw new RuntimeException("本地离线翻译服务当前不可用，请确保侧边栏翻译容器已正常运行。", e);
        }
    }
}
```

*   **短路保护 (Short-Circuit Protection)**：在发起网络请求前，拦截空字符串与同语种翻译，避免无效推理开销。
*   **ISO 代码规范化**：`convertLanguageCode` 统一映射前端传入的变体（如 `zh-CN` 映射为 `zh`）。

---

## 5. CPU 离线 NMT 懒加载 (Lazy Load) 机制与 30 秒超时调优

### 5.1 懒加载瓶颈与冷启动
Sidecar 容器为了节省内存，启动时不预载全量语种模型。首次发起特定语种（如中文 ➡️ 俄语 `zh` ➡️ `ru`）翻译时，容器需从磁盘读取解压 `translate-ru_en-1_9.argosmodel` 并构建计算图，冷加载耗时 **5 ~ 10 秒**。

### 5.2 500 异常原因与超时调优
*   旧配置超时为 5 秒，首次请求由于 Sidecar 正在执行 8 秒的冷加载而触发 `SocketTimeoutException`，网关捕获后抛出 500 错误。
*   将 `yudao.translate.timeout` 调整为 **`30000` (30 秒)** 后，给冷加载留足等待时间。加载完成后模型常驻 CPU 内存，后续请求均在 **100ms** 内完成。

---

## 6. Docker 伴生容器部署规范

```bash
docker run -d --name yudao-translate \
  --restart=always \
  -p 5000:5000 \
  -v ./translate-models:/home/libretranslate/.local/share/argos-translate/packages \
  libretranslate/libretranslate --load-only zh,en,ru,ko
```

*   **`-v ./translate-models:...`**：挂载本地离线模型文件夹。
*   **`--restart=always`**：保证宿主机重启后自动恢复 Sidecar 容器运行。

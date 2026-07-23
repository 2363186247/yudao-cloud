[← 返回主技术说明文档](../全文检索服务构建与学习文档.md)

# Spring Boot 多环境配置规范与 `spring.config.import` 机制

本文档阐述微服务工程 `yudao-module-search-server` 的多环境 YAML 配置分工原则与优先级覆盖法则。

---

## 1. 现代配置导入机制 `spring.config.import`

在 Spring Boot 2.4 / Spring Cloud 2020 之前，微服务通常依靠独立的 `bootstrap.yaml` 优先加载 Nacos 连接参数。在现代规范中，该方式已由统一的 `spring.config.import` 机制替代。

在 [application.yaml](../../yudao-module-search/yudao-module-search-server/src/main/resources/application.yaml) 中通过以下配置完成动态导入：

```yaml
spring:
  config:
    import:
      - optional:classpath:application-${spring.profiles.active}.yaml # 导入本地特定 Profile 配置
      - optional:nacos:${spring.application.name}-${spring.profiles.active}.yaml # 导入 Nacos 远程配置中心配置
```

---

## 2. 三大 YAML 配置文件分工原则

### 2.1 `application.yaml`（主基线配置）
*   **职责**：跨环境通用配置基线。
*   **内容**：微服务标识（`spring.application.name: search-server`）、端口基线（`server.port: 18082`）、 Knife4j 接口文档配置及默认 Profile 声明（`spring.profiles.active: local`）。

### 2.2 `application-local.yaml`（本地开发环境配置）
*   **职责**：开发者本地联调属性覆写。
*   **内容**：本地基础设施连接串（如本地 Nacos `127.0.0.1:8848`、本地 MongoDB `127.0.0.1:27017`）。

### 2.3 `application-dev.yaml`（开发测试服务器配置）
*   **职责**：集成测试环境属性覆写。
*   **内容**：测试集群基础设施连接参数（如测试机 Nacos IP、MongoDB 集群地址）。

---

## 3. 配置属性覆盖优先级规则 (Profile Override)

Spring Boot 的属性加载遵循“**后加载覆写先加载**”的原则，优先级从低到高排列如下：

$$\text{application.yaml (基线配置)} < \text{application-local.yaml (Profile配置)} < \text{Nacos 远程配置中心} < \text{命令行启动参数 (args)}$$

启动命令参数（如 `--server.port=18083`）拥有最高优先级，可在运行期直接覆盖文件预设属性。

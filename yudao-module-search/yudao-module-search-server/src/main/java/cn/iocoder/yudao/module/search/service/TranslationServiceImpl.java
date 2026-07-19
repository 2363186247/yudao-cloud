package cn.iocoder.yudao.module.search.service;

import cn.hutool.core.util.StrUtil;
import cn.hutool.http.HttpUtil;
import cn.hutool.json.JSONUtil;
import cn.iocoder.yudao.module.search.framework.config.TranslateProperties;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

/**
 * 离线多语言智能翻译服务实现类 (基于本地轻量级 CTranslate2 / LibreTranslate 伴生微服务方案)
 * 遵循 Spring Boot 及 Yudao 框架的标准规范重构，无嵌入式补丁。
 */
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

            // 发送本地 HTTP 请求到 CTranslate2 / LibreTranslate 离线推理容器，配置读取自 TranslateProperties
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

    private String convertLanguageCode(String lang) {
        if (StrUtil.isBlank(lang)) {
            return "auto";
        }
        lang = lang.toLowerCase().trim();
        if (lang.contains("zh") || lang.contains("cn")) {
            return "zh";
        }
        if (lang.contains("en")) {
            return "en";
        }
        if (lang.contains("ko")) {
            return "ko";
        }
        if (lang.contains("ru")) {
            return "ru";
        }
        return lang;
    }
}

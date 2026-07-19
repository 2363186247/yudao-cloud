package cn.iocoder.yudao.module.search.framework.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

/**
 * 多语言离线翻译配置项
 * 遵循 Spring Boot 及 Yudao 框架标准规范管理配置
 */
@Component
@ConfigurationProperties("yudao.translate")
@Data
@Validated
public class TranslateProperties {

    /**
     * 本地 CTranslate2 / LibreTranslate 离线翻译服务的 API 端点
     */
    @NotEmpty(message = "翻译服务 API 地址不能为空")
    private String apiUrl = "http://127.0.0.1:5000/translate";

    /**
     * 接口调用超时时间（毫秒），默认 5 秒，防止翻译阻塞拖垮主服务连接池
     */
    @NotNull(message = "翻译服务超时时间不能为空")
    private Integer timeout = 5000;

}

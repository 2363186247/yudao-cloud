package cn.iocoder.yudao.module.search.controller.admin.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Schema(description = "管理后台 - 智能翻译请求 VO")
@Data
public class TranslationReqVO {

    @Schema(description = "待翻译文本内容", requiredMode = Schema.RequiredMode.REQUIRED, example = "Hello, World!")
    @NotBlank(message = "待翻译文本不能为空")
    private String text;

    @Schema(description = "源语言代码 (如: en, zh, ko, ru)", requiredMode = Schema.RequiredMode.REQUIRED, example = "en")
    @NotBlank(message = "源语言代码不能为空")
    private String sourceLang;

    @Schema(description = "目标语言代码 (如: en, zh, ko, ru)", requiredMode = Schema.RequiredMode.REQUIRED, example = "zh")
    @NotBlank(message = "目标语言代码不能为空")
    private String targetLang;

}

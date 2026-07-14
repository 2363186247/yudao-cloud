package cn.iocoder.yudao.module.search.controller.admin.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.List;

@Schema(description = "管理后台 - 全文检索文档创建/修改 Request VO")
@Data
public class SearchDocumentSaveReqVO {

    @Schema(description = "文档编号 (新增时为null，修改时必填)", example = "60c72b2f9b1d8e2a1c8f4b5a")
    private String id;

    @Schema(description = "文档标题", requiredMode = Schema.RequiredMode.REQUIRED, example = "芋道源码接入MongoDB教程")
    @NotBlank(message = "文档标题不能为空")
    private String title;

    @Schema(description = "文档关键字/标签", requiredMode = Schema.RequiredMode.REQUIRED, example = "[\"Spring Boot\", \"MongoDB\"]")
    @NotEmpty(message = "文档关键字不能为空")
    private List<String> keywords;

    @Schema(description = "文档正文内容", requiredMode = Schema.RequiredMode.REQUIRED, example = "今天我们来介绍如何使用 Spring Data MongoDB...")
    @NotBlank(message = "文档正文内容不能为空")
    private String content;

    @Schema(description = "其他自定义动态字段")
    private java.util.Map<String, Object> extra;

}

package cn.iocoder.yudao.module.search.controller.admin.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Schema(description = "管理后台 - 全文检索文档 Response VO")
@Data
public class SearchDocumentRespVO {

    @Schema(description = "文档编号", requiredMode = Schema.RequiredMode.REQUIRED, example = "60c72b2f9b1d8e2a1c8f4b5a")
    private String id;

    @Schema(description = "文档标题", requiredMode = Schema.RequiredMode.REQUIRED, example = "芋道源码接入MongoDB教程")
    private String title;

    @Schema(description = "文档标题高亮", example = "芋道源码接入<mark>MongoDB</mark>教程")
    private String titleHighlight;

    @Schema(description = "文档关键字/标签", requiredMode = Schema.RequiredMode.REQUIRED, example = "[\"Spring Boot\", \"MongoDB\"]")
    private List<String> keywords;

    @Schema(description = "文档正文内容", requiredMode = Schema.RequiredMode.REQUIRED, example = "今天我们来介绍如何使用 Spring Data MongoDB...")
    private String content;

    @Schema(description = "文档正文摘要高亮", example = "今天我们来介绍如何使用 Spring Data <mark>MongoDB</mark>...")
    private String contentSnippetHighlight;

    @Schema(description = "检索相关度得分", example = "3.24")
    private Float score;

    @Schema(description = "创建时间", requiredMode = Schema.RequiredMode.REQUIRED)
    private LocalDateTime createTime;

    @Schema(description = "其他自定义动态字段")
    private java.util.Map<String, Object> extra;

}

package cn.iocoder.yudao.module.search.controller.admin.vo;

import cn.iocoder.yudao.framework.common.pojo.PageParam;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Schema(description = "管理后台 - 全文检索分页 Request VO")
@Data
@EqualsAndHashCode(callSuper = true)
public class SearchPageReqVO extends PageParam {

    @Schema(description = "检索范围：all (全文), title (标题), content (正文)", example = "all")
    private String searchType;

    @Schema(description = "检索关键词", example = "伊朗 战争")
    private String searchKey;

}

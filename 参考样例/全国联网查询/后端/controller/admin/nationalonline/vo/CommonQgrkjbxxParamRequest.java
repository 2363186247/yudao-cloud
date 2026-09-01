package cn.sd.psdp.module.kyqb.controller.admin.nationalonline.vo;

import cn.sd.psdp.framework.common.pojo.PageParam;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class CommonQgrkjbxxParamRequest extends PageParam{
    private static final long serialVersionUID = 1L;

    @Schema(description = "具体请求参数")
    private CommonQgrkjbxxParams params;

    @Schema(description = "查询人员信息")
    private XspUser xspUser;

    @Schema(description = "查询时间数组，如[2020-01-01,2026-01-01]")
    private List<String> timeRange;

    @Schema(description = "配置参数")
    private ConfigParam config;

    @Schema(description = "分页参数")
    private WaPageParam page;

    @Schema(description = "请求方式 POST")
    private String methods = "POST";
}

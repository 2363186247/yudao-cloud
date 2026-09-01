package cn.sd.psdp.module.kyqb.controller.admin.nationalonline.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.io.Serializable;

@Schema(description = "管理后台 - 查询人员信息")
@Data
public class XspUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Schema(description = "当前用户真实姓名")
    private String realname;

    @Schema(description = "身份证号（后台校验有效性）")
    private String cert;

    @Schema(description = "填 true")
    private Boolean iscase;

    @Schema(description = "案件编号")
    private String caseno;

    @Schema(description = "应用id")
    private String appid;

    @Schema(description = "应用名称")
    private String appname;

    @Schema(description = "12 位用户单位编码")
    private String deptcode;

    @Schema(description = "用户单位名称")
    private String deptname;

    @Schema(description = "用户单位所在行政区域代码（6 位行政区划代码）")
    private String areacode;

    @Schema(description = "证件类型，默认 111")
    private String cety;

    @Schema(description = "登录用户的用户 ID")
    private String id;

    @Schema(description = "登录用户的用户名")
    private String username;

}

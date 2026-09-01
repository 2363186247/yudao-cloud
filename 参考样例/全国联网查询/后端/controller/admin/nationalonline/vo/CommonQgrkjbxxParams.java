package cn.sd.psdp.module.kyqb.controller.admin.nationalonline.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.io.Serializable;

@Schema(description = "管理后台 - 全国人口基本信息查询参数 VO")
@Data
public class CommonQgrkjbxxParams implements Serializable {

    private static final long serialVersionUID = 1L;

    @Schema(description = "户号")
    @JsonProperty("B030044")
    private String b030044;

    @Schema(description = "证件号码")
    @JsonProperty("B030005")
    private String b030005;

}

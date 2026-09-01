package cn.sd.psdp.module.kyqb.controller.admin.nationalonline.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonFormat;
import cn.sd.psdp.framework.common.pojo.PageParam;
import static cn.sd.psdp.framework.common.util.date.DateUtils.FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND;

@Schema(description = "管理后台 - 全国联网查询 Request VO")
@EqualsAndHashCode(callSuper = true)
@Data
public class NationalOnlineReqVO extends PageParam {

    @Schema(description = "id")
    private String id;

    @Schema(description = "姓名", example = "张三")
    private String name;

    @Schema(description = "性别", example = "男")
    private String gender;

    @Schema(description = "出生日期", example = "1990-01-01")
    @JsonFormat(pattern = FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND, timezone = "GMT+8")
    private LocalDateTime birthDate;

    @Schema(description = "身份证号", example = "110101199001011234")
    private String idCard;

    @Schema(description = "手机号码", example = "13800138000")
    private String phone;

    @Schema(description = "时间范围")
    private String timeRange = "30";

    @Schema(description = "户籍地", example = "北京市朝阳区")
    private String householdRegister;

    @Schema(description = "当地地区", example = "北京市海淀区")
    private String localArea;

    @Schema(description = "数据来源", example = "××省业务系统")
    private String dataSource;

    @Schema(description = "关联情报", example = "16598")
    private String relatedInfo;

    @Schema(description = "创建时间")
    @JsonFormat(pattern = FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND, timezone = "GMT+8")
    private LocalDateTime createTime;

    @Schema(description = "更新时间")
    @JsonFormat(pattern = FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND, timezone = "GMT+8")
    private LocalDateTime updateTime;

}

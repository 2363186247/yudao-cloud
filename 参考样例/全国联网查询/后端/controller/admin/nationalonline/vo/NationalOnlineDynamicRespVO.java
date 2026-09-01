package cn.sd.psdp.module.kyqb.controller.admin.nationalonline.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Schema(description = "管理后台 - 全国联网动态查询 Response VO")
@Data
public class NationalOnlineDynamicRespVO {

    @Schema(description = "动态表单列定义")
    private List<TableParam> tableParams;

    @Schema(description = "动态表单数据")
    private List<Map<String, Object>> list;

    @Data
    public static class TableParam {

        @Schema(description = "列标签", example = "姓名")
        private String label;

        @Schema(description = "列字段", example = "name")
        private String field;

        public TableParam() {
        }

        public TableParam(String label, String field) {
            this.label = label;
            this.field = field;
        }
    }
}

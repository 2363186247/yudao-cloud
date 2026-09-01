package cn.sd.psdp.module.kyqb.controller.admin.nationalonline.vo;

import lombok.Data;

@Data
public class WgTokenRequest {
    private String app_id;
    private String fingerprint;
    private String primary_token = "";
    private String challenge = "";
}

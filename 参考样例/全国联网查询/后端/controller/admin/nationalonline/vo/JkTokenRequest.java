package cn.sd.psdp.module.kyqb.controller.admin.nationalonline.vo;

import lombok.Data;

@Data
public class JkTokenRequest {
    private String client_id;
    private String client_secret;
    private String grant_type ;
    private String scope ;
}

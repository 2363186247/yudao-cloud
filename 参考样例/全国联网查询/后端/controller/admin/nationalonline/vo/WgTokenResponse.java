package cn.sd.psdp.module.kyqb.controller.admin.nationalonline.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class WgTokenResponse {
    @JsonProperty("access_token")
    private String accessToken;

    @JsonProperty("consumer_id")
    private String consumerId;

    @JsonProperty("consumer_name")
    private String consumerName;

    @JsonProperty("consumer_uuid")
    private String consumerUuid;

    @JsonProperty("device_id")
    private String deviceId;

    @JsonProperty("expires_in")
    private Integer expiresIn;

    @JsonProperty("external_sub")
    private String externalSub;

    private String message;

    @JsonProperty("message_zh_cn")
    private String messageZhCn;

    private Integer status;

    private String uid;
}

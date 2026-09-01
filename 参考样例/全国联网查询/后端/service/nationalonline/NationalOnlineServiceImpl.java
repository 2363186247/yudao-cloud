package cn.sd.psdp.module.kyqb.service.nationalonline;

import cn.sd.psdp.framework.common.pojo.CommonResult;
import cn.sd.psdp.framework.common.pojo.PageResult;
import cn.sd.psdp.framework.security.core.LoginUser;
import cn.sd.psdp.framework.security.core.util.SecurityFrameworkUtils;
import cn.sd.psdp.module.kyqb.controller.admin.nationalonline.vo.*;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import cn.sd.psdp.framework.common.util.http.HttpClientUtil;
import cn.hutool.core.util.StrUtil;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.validation.annotation.Validated;

import static cn.sd.psdp.framework.common.pojo.CommonResult.error;
import static cn.sd.psdp.framework.common.pojo.CommonResult.success;
import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Service
@Validated
@Slf4j
public class NationalOnlineServiceImpl implements NationalOnlineService {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Resource
    private RedisTemplate<String, String> redisTemplate;

    private static final String REDIS_TOKEN_KEY = "X-trustagw-access-token";

    private static final String REDIS_JK_TOKEN_KEY = "jk-access-token";

    private static final String URL = "https://11.111.111.11:10443";

    private static final String WG_TOKEN_URL = "/sts/token";

    //接口token接口参数
    private static final String CLIENT_ID = "4j111111";

    private static final String CLIENT_SECRET = "101111111111111113";

    private static final String GRANT_TYPE = "client_cr11111111";

    private static final String SCOPE = "email";

    private static final String JK_TOKEN_URL = "/xsp-auth/oauth2/token";

    //网关token接口参数
    private static final String APP_ID = "cb11111111111111111";

    private static final String INPUT = "app_id=cb98cd11111111&app_key=6bde63111111111117d1ec0609&mid=1+2&uid=si111111";

    @Override
    public PageResult<NationalOnlineRespVO> getQgrkjbxxZjhm(NationalOnlineReqVO reqVO) {
        String interfaceName = "按证件号码服务接口";
        String interfaceUrl = "/api/agency/R-01";

        CommonQgrkjbxxParamRequest commonParamRequest = new CommonQgrkjbxxParamRequest();
        commonParamRequest.setPageSize(99999);
        commonParamRequest.setParams(new CommonQgrkjbxxParams());
        commonParamRequest.setConfig(new ConfigParam());

        //构造timeRange：reqVO.timeRange为天数（如"30"），转为[当天往前N天的日期, 当天日期]
        List<String> timeRange = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate endDate = LocalDate.now();
        int days = StrUtil.isNotBlank(reqVO.getTimeRange()) ? Integer.parseInt(reqVO.getTimeRange()) : 30;
        LocalDate startDate = endDate.minusDays(days);
        timeRange.add(startDate.format(formatter));
        timeRange.add(endDate.format(formatter));
        commonParamRequest.setTimeRange(timeRange);

        XspUser xspUser = new XspUser();
        xspUser = buildXspUser(xspUser);
        //将xsp-user处理为base64编码
        String xspUserBase64 = null;
        try {
            xspUserBase64 = new String(Base64.getEncoder().encode(objectMapper.writeValueAsString(xspUser).getBytes()));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        //获取token
        TokenResp tokenResp = getWaJkToken();

        try {
            //设置分页
            String jsonBody = objectMapper.writeValueAsString(commonParamRequest);

            //构建请求头
            Map<String, String> headers = new HashMap<>();
            headers.put("Accept", "*/*");
            headers.put("Connection", "keep-alive");
            headers.put("Content-Type", "application/json");
            headers.put(REDIS_TOKEN_KEY, tokenResp.getWgToken());
            headers.put("Authorization", "Bearer " + tokenResp.getJkToken());
            headers.put("xsp-user", xspUserBase64);

            //执行请求（HttpClientUtil 自动处理 HTTPS 忽略SSL）
            log.info("开始调用接口("+interfaceName+")...");
            String responseBody = HttpClientUtil.doPostJson(URL + interfaceUrl, jsonBody, null, headers);
            log.info("接口响应: {}", responseBody);

            if (responseBody == null || responseBody.isEmpty()) {
                log.error("接口("+interfaceName+")调用失败，响应为空");
                throw new RuntimeException("接口("+interfaceName+")调用失败，响应为空");
            }

            List<CommonQgrkjbxx> list = ((JSONObject) JSONObject.parse(responseBody)).getJSONArray("data").toJavaList(CommonQgrkjbxx.class);
            //反序列化特殊处理，*号开头不能自动序列化
            if (!CollectionUtils.isEmpty(list)){
                JSONArray jsonArray = ((JSONObject) JSONObject.parse(responseBody)).getJSONArray("data");
                for (int i = 0; i < jsonArray.size(); i++) {
                    JSONObject jsonObject = (JSONObject) jsonArray.get(i);
                    CommonQgrkjbxx commonQgrkjbxx = list.get(i);
                    commonQgrkjbxx.setDic_b010011(jsonObject.get("*dic_B010011")==null?"":jsonObject.get("*dic_B010011").toString());
                    commonQgrkjbxx.setDic_b010012(jsonObject.get("*dic_B010012")==null?"":jsonObject.get("*dic_B010012").toString());
                    commonQgrkjbxx.setDic_b010026(jsonObject.get("*dic_B010026")==null?"":jsonObject.get("*dic_B010026").toString());
                    commonQgrkjbxx.setDic_b010013(jsonObject.get("*dic_B010013")==null?"":jsonObject.get("*dic_B010013").toString());
                    commonQgrkjbxx.setDic_b030001(jsonObject.get("*dic_B030001")==null?"":jsonObject.get("*dic_B030001").toString());
                    commonQgrkjbxx.setDic_b030004(jsonObject.get("*dic_B030004")==null?"":jsonObject.get("*dic_B030004").toString());
                    commonQgrkjbxx.setDic_b030015(jsonObject.get("*dic_B030015")==null?"":jsonObject.get("*dic_B030015").toString());
                    commonQgrkjbxx.setDic_b030016(jsonObject.get("*dic_B030016")==null?"":jsonObject.get("*dic_B030016").toString());
                    commonQgrkjbxx.setDic_b030017(jsonObject.get("*dic_B030017")==null?"":jsonObject.get("*dic_B030017").toString());
                    commonQgrkjbxx.setDic_b050016(jsonObject.get("*dic_B050016")==null?"":jsonObject.get("*dic_B050016").toString());
                    commonQgrkjbxx.setDic_f010008(jsonObject.get("*dic_F010008")==null?"":jsonObject.get("*dic_F010008").toString());
                    commonQgrkjbxx.setDic_h010009(jsonObject.get("*dic_H010009")==null?"":jsonObject.get("*dic_H010009").toString());
                    list.set(i, commonQgrkjbxx);
                }
            }
            // 聚合数据：按身份证号查询返回的多条记录聚合为一个NationalOnlineRespVO
            NationalOnlineRespVO respVO = new NationalOnlineRespVO();
            if (!CollectionUtils.isEmpty(list)) {
                CommonQgrkjbxx first = list.get(0);
                respVO.setName(first.getB010001());
                respVO.setIdCard(first.getB030005());
                respVO.setPhone(first.getB020005());
            }
            respVO.setDataSource("03");
            respVO.setRelatedInfo(String.valueOf(list.size()));
            respVO.setDynamicData(buildDynamicData(list));

            return new PageResult<>(List.of(respVO), 1L);

        } catch (IOException e) {
            log.error("调用网安接口("+interfaceName+")异常", e);
            throw new RuntimeException("调用网安接口("+interfaceName+")异常", e);
        }
    }

    /**
     * 将CommonQgrkjbxx列表转换为动态数据结构
     * 通过反射获取字段定义，构建tableParams（列定义）和list（数据行）
     * 仅包含至少有一条记录非空的字段，避免过多空列
     */
    private NationalOnlineDynamicRespVO buildDynamicData(List<CommonQgrkjbxx> list) {
        NationalOnlineDynamicRespVO dynamicData = new NationalOnlineDynamicRespVO();
        Field[] fields = CommonQgrkjbxx.class.getDeclaredFields();

        // 构建tableParams：只包含至少有一条记录非空的字段
        List<NationalOnlineDynamicRespVO.TableParam> tableParams = new ArrayList<>();
        for (Field field : fields) {
            if (Modifier.isStatic(field.getModifiers())) {
                continue;
            }
            boolean hasValue = false;
            for (CommonQgrkjbxx item : list) {
                try {
                    field.setAccessible(true);
                    Object value = field.get(item);
                    if (value != null && !value.toString().isEmpty()) {
                        hasValue = true;
                        break;
                    }
                } catch (IllegalAccessException e) {
                    // ignore
                }
            }
            if (hasValue) {
                Schema schema = field.getAnnotation(Schema.class);
                String label = (schema != null && !schema.description().isEmpty()) ? schema.description() : field.getName();
                tableParams.add(new NationalOnlineDynamicRespVO.TableParam(label, field.getName()));
            }
        }
        dynamicData.setTableParams(tableParams);

        // 构建数据行
        List<Map<String, Object>> dataList = new ArrayList<>();
        for (CommonQgrkjbxx item : list) {
            Map<String, Object> row = new LinkedHashMap<>();
            for (Field field : fields) {
                if (Modifier.isStatic(field.getModifiers())) {
                    continue;
                }
                try {
                    field.setAccessible(true);
                    row.put(field.getName(), field.get(item));
                } catch (IllegalAccessException e) {
                    row.put(field.getName(), null);
                }
            }
            dataList.add(row);
        }
        dynamicData.setList(dataList);

        return dynamicData;
    }

    private XspUser buildXspUser(XspUser xspUser){
        xspUser.setRealname(SecurityFrameworkUtils.getLoginUserNickname());
        xspUser.setCaseno(String.valueOf(SecurityFrameworkUtils.getLoginUserId()));
        xspUser.setAppid("cb981111111f95");
        xspUser.setAppname("6bde6311111111");
        xspUser.setDeptcode(SecurityFrameworkUtils.getLoginUserDeptCode());
        xspUser.setDeptname(SecurityFrameworkUtils.getLoginUserDeptName());
        xspUser.setAreacode(SecurityFrameworkUtils.getLoginUserDeptCode().substring(0,6));
        xspUser.setCety("1111");
        return  xspUser;
    }

    public TokenResp getWaJkToken() {
        //获取网关token
        String wgToken = getWaWgToken();

        // 1. 先尝试从Redis获取
        String jkToken = redisTemplate.opsForValue().get(REDIS_JK_TOKEN_KEY);

        if (jkToken != null && !jkToken.isEmpty()) {
            log.info("从Redis获取到网安接口Token: {}", maskToken(jkToken));
            TokenResp tokenResp = new TokenResp();
            tokenResp.setWgToken(wgToken);
            tokenResp.setJkToken(jkToken);
            return tokenResp;
        }

        // 2. Redis中没有，调用接口获取
        log.info("Redis中未找到网安接口Token，开始调用接口获取...");

        try {
            // 创建请求体
            JkTokenRequest jkTokenRequest = new JkTokenRequest();
            jkTokenRequest.setClient_id(CLIENT_ID);
            jkTokenRequest.setClient_secret(CLIENT_SECRET);
            jkTokenRequest.setGrant_type(GRANT_TYPE);
            jkTokenRequest.setScope(SCOPE);

            String jsonBody = objectMapper.writeValueAsString(jkTokenRequest);

            //构建请求头
            Map<String, String> headers = new HashMap<>();
            headers.put("Accept", "*/*");
            headers.put("Connection", "keep-alive");
            headers.put("Content-Type", "application/json");
            headers.put(REDIS_TOKEN_KEY, wgToken);

            //执行请求（HttpClientUtil 自动处理 HTTPS 忽略SSL）
            log.info("开始调用接口Token接口...");
            String responseBody = HttpClientUtil.doPostJson(URL + JK_TOKEN_URL, jsonBody, null, headers);
            log.info("接口响应: {}", responseBody);

            if (responseBody == null || responseBody.isEmpty()) {
                log.error("接口调用失败，响应为空");
                throw new RuntimeException("接口调用失败，响应为空");
            }

            JkTokenResponse jkTokenResponse = objectMapper.readValue(responseBody, JkTokenResponse.class);

            if (jkTokenResponse.getAccessToken() != null) {
                String accessToken = jkTokenResponse.getAccessToken();

                // 3. 将Token存入Redis，设置100分钟过期时间
                saveJkTokenToRedis(accessToken);

                TokenResp tokenResp = new TokenResp();
                tokenResp.setWgToken(wgToken);
                tokenResp.setJkToken(accessToken);

                return tokenResp;
            } else {
                log.error("获取网安接口Token失败!");
                throw new RuntimeException("获取网安接口Token失败!");
            }
        } catch (IOException e) {
            log.error("调用网安接口Token接口异常", e);
            throw new RuntimeException("调用网安接口Token接口异常", e);
        }
    }

    public String getWaWgToken() {
        //进行实际请求并获取token

        // 1. 先尝试从Redis获取
        String token = redisTemplate.opsForValue().get(REDIS_TOKEN_KEY);

        if (token != null && !token.isEmpty()) {
            log.info("从Redis获取到网安网关Token: {}", maskToken(token));
            return token;
        }

        // 2. Redis中没有，调用接口获取
        log.info("Redis中未找到网安网关Token，开始调用接口获取...");
        return fetchTokenFromApi();
    }

    private <T> WaPageData<T> buildWaPageData(WaPageData<T> resultList,Integer total,Integer pageNum,Integer pageSize){
        resultList.setTotal(total);
        resultList.setPageNum(pageNum);
        resultList.setPageSize(pageSize);
        resultList.setPages(total==0?0:(total/pageSize)+1);
        return resultList;
    }

    private String fetchTokenFromApi() {

        try {
            // 创建请求体
            WgTokenRequest wgTokenRequest = new WgTokenRequest();
            wgTokenRequest.setApp_id(APP_ID);
            wgTokenRequest.setFingerprint(getEncryptionCoding());

            String jsonBody = objectMapper.writeValueAsString(wgTokenRequest);

            //构建请求头
            Map<String, String> headers = new HashMap<>();
            headers.put("Accept", "*/*");
            headers.put("Connection", "keep-alive");
            headers.put("Content-Type", "application/json");

            //执行请求（HttpClientUtil 自动处理 HTTPS 忽略SSL）
            log.info("开始调用网关Token接口...");
            String responseBody = HttpClientUtil.doPostJson(URL + WG_TOKEN_URL, jsonBody, null, headers);
            log.info("接口响应: {}", responseBody);

            if (responseBody == null || responseBody.isEmpty()) {
                log.error("接口调用失败，响应为空");
                throw new RuntimeException("接口调用失败，响应为空");
            }

            WgTokenResponse wgTokenResponse = objectMapper.readValue(responseBody, WgTokenResponse.class);

            if (wgTokenResponse.getStatus() == 200 && wgTokenResponse.getAccessToken() != null) {
                String accessToken = wgTokenResponse.getAccessToken();

                // 3. 将Token存入Redis，设置10小时过期时间
                saveTokenToRedis(accessToken);

                return accessToken;
            } else {
                log.error("获取网安网关Token失败: {}", wgTokenResponse.getMessage());
                throw new RuntimeException("获取网安网关Token失败: " + wgTokenResponse.getMessage());
            }
        } catch (IOException e) {
            log.error("调用网安网关Token接口异常", e);
            throw new RuntimeException("调用网安网关Token接口异常", e);
        }
    }

    /**
     * 将网关Token保存到Redis
     */
    private void saveTokenToRedis(String accessToken) {
        try {
            // 设置token，过期时间为10小时（36000秒）
            redisTemplate.opsForValue().set(
                    REDIS_TOKEN_KEY,
                    accessToken,
                    10,
                    TimeUnit.HOURS
            );

            log.info("网安网关Token已保存到Redis，过期时间: 10小时，Token: {}", maskToken(accessToken));
        } catch (Exception e) {
            log.error("保存网安网关Token到Redis失败", e);
            throw new RuntimeException("保存网安网关Token到Redis失败", e);
        }
    }

    /**
     * 脱敏显示Token
     */
    private String maskToken(String token) {
        if (token == null || token.length() <= 8) {
            return "***";
        }
        return token.substring(0, 8) + "***" + token.substring(token.length() - 4);
    }

    /**
     * 将接口Token保存到Redis
     */
    private void saveJkTokenToRedis(String accessToken) {
        try {
            // 设置token，过期时间为100分钟（6000秒）
            redisTemplate.opsForValue().set(
                    REDIS_JK_TOKEN_KEY,
                    accessToken,
                    100,
                    TimeUnit.MINUTES
            );

            log.info("网安接口Token已保存到Redis，过期时间: 100分钟，Token: {}", maskToken(accessToken));
        } catch (Exception e) {
            log.error("保存网安接口Token到Redis失败", e);
            throw new RuntimeException("保存网安接口Token到Redis失败", e);
        }
    }

    public String getEncryptionCoding() {
        String result = "";

        try {
            result = DigestUtils.sha1Hex(INPUT);
            result = Base64.getEncoder().encodeToString(result.getBytes());

        }catch (Exception e){
            throw new RuntimeException(e);
        }

        return result;
    }

}



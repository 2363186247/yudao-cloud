package cn.sd.psdp.module.kyqb.controller.admin.nationalonline;

import cn.hutool.core.util.StrUtil;
import cn.sd.psdp.framework.common.pojo.CommonResult;
import cn.sd.psdp.framework.common.pojo.PageResult;
import cn.sd.psdp.module.kyqb.controller.admin.nationalonline.vo.*;
import cn.sd.psdp.module.kyqb.service.nationalonline.NationalOnlineService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import static cn.sd.psdp.framework.common.pojo.CommonResult.success;

@Tag(name = "管理后台 - 全国联网查询")
@RestController
@RequestMapping("/kyqb/national-online")
@Validated
@Slf4j
public class NationalOnlineController {

    @Resource
    private NationalOnlineService nationalOnlineService;

    @PostMapping("/get")
    @Operation(summary = "全国联网查询（含动态数据）")
    public CommonResult<PageResult<NationalOnlineRespVO>> getNationalOnline(@Valid @RequestBody NationalOnlineReqVO reqVO) {
        try {

            PageResult<NationalOnlineRespVO> result = new PageResult<>();
            if (StrUtil.equals("03",reqVO.getDataSource())) {
                result = nationalOnlineService.getQgrkjbxxZjhm(reqVO);
            }else {
                //TODO 其他数据来源功能待实现
                return success(buildMockData());
            }
            return success(result);

        } catch (Exception e) {
            log.error("[getNationalOnline][网安接口调不通，返回假数据 reqVO={}]", reqVO, e);
            return success(buildMockData());
        }
    }


    /**
     * 构造假数据（网安接口调不通时返回）
     */
    private PageResult<NationalOnlineRespVO> buildMockData() {
        List<NationalOnlineRespVO> list = new ArrayList<>();

        // 第一条：张三（含动态数据）
        NationalOnlineRespVO mockVO1 = new NationalOnlineRespVO();
        mockVO1.setId("1001");
        mockVO1.setName("张三");
        mockVO1.setGender("男");
        mockVO1.setBirthDate(LocalDateTime.of(1990, 1, 1, 0, 0));
        mockVO1.setIdCard("110101199001011234");
        mockVO1.setPhone("13800138000");
        mockVO1.setHouseholdRegister("北京市朝阳区");
        mockVO1.setLocalArea("北京市海淀区");
        mockVO1.setDataSource("01");
        mockVO1.setRelatedInfo("16598");
        mockVO1.setCreateTime(LocalDateTime.now());
        mockVO1.setUpdateTime(LocalDateTime.now());
        mockVO1.setDynamicData(buildMockDynamicData());
        list.add(mockVO1);

        // 第二条：李四（无动态数据）
        NationalOnlineRespVO mockVO2 = new NationalOnlineRespVO();
        mockVO2.setId("1002");
        mockVO2.setName("李四");
        mockVO2.setGender("女");
        mockVO2.setBirthDate(LocalDateTime.of(1985, 5, 15, 0, 0));
        mockVO2.setIdCard("310101198505152345");
        mockVO2.setPhone("13900139000");
        mockVO2.setHouseholdRegister("上海市浦东新区");
        mockVO2.setLocalArea("上海市徐汇区");
        mockVO2.setDataSource("01");
        mockVO2.setRelatedInfo("16599");
        mockVO2.setCreateTime(LocalDateTime.now());
        mockVO2.setUpdateTime(LocalDateTime.now());
        mockVO2.setDynamicData(null);
        list.add(mockVO2);

        return new PageResult<>(list, 2L);
    }

    /**
     * 构造假动态数据
     */
    private NationalOnlineDynamicRespVO buildMockDynamicData() {
        NationalOnlineDynamicRespVO dynamicRespVO = new NationalOnlineDynamicRespVO();

        // 动态表单列定义
        List<NationalOnlineDynamicRespVO.TableParam> tableParams = new ArrayList<>();
        tableParams.add(new NationalOnlineDynamicRespVO.TableParam("轨迹编号", "trackId"));
        tableParams.add(new NationalOnlineDynamicRespVO.TableParam("出行方式", "travelType"));
        tableParams.add(new NationalOnlineDynamicRespVO.TableParam("出发地", "departure"));
        tableParams.add(new NationalOnlineDynamicRespVO.TableParam("目的地", "destination"));
        tableParams.add(new NationalOnlineDynamicRespVO.TableParam("出发时间", "departureTime"));
        tableParams.add(new NationalOnlineDynamicRespVO.TableParam("到达时间", "arrivalTime"));
        tableParams.add(new NationalOnlineDynamicRespVO.TableParam("车次/航班号", "tripNo"));
        tableParams.add(new NationalOnlineDynamicRespVO.TableParam("座位号", "seatNo"));
        tableParams.add(new NationalOnlineDynamicRespVO.TableParam("同行人数", "companionCount"));
        tableParams.add(new NationalOnlineDynamicRespVO.TableParam("活动名称", "activityName"));
        tableParams.add(new NationalOnlineDynamicRespVO.TableParam("活动地点", "activityLocation"));
        tableParams.add(new NationalOnlineDynamicRespVO.TableParam("活动时间", "activityTime"));
        tableParams.add(new NationalOnlineDynamicRespVO.TableParam("活动类型", "activityType"));
        tableParams.add(new NationalOnlineDynamicRespVO.TableParam("参与身份", "participateRole"));
        tableParams.add(new NationalOnlineDynamicRespVO.TableParam("数据来源", "dataSource"));
        tableParams.add(new NationalOnlineDynamicRespVO.TableParam("采集时间", "collectTime"));
        dynamicRespVO.setTableParams(tableParams);

        // 动态表单数据
        List<Map<String, Object>> dataList = new ArrayList<>();

        Map<String, Object> row1 = new LinkedHashMap<>();
        row1.put("trackId", "T20260717001");
        row1.put("travelType", "高铁");
        row1.put("departure", "北京南站");
        row1.put("destination", "上海虹桥站");
        row1.put("departureTime", "2026-07-17 08:00:00");
        row1.put("arrivalTime", "2026-07-17 13:28:00");
        row1.put("tripNo", "G101");
        row1.put("seatNo", "05车08A");
        row1.put("companionCount", "2");
        row1.put("activityName", "2026 中国人工智能大会");
        row1.put("activityLocation", "上海国际会议中心");
        row1.put("activityTime", "2026-07-17 14:00:00");
        row1.put("activityType", "学术会议");
        row1.put("participateRole", "参会人员");
        row1.put("dataSource", "铁路售票系统");
        row1.put("collectTime", "2026-07-17 06:30:00");
        dataList.add(row1);

        Map<String, Object> row2 = new LinkedHashMap<>();
        row2.put("trackId", "T20260717002");
        row2.put("travelType", "航班");
        row2.put("departure", "广州白云机场");
        row2.put("destination", "成都双流机场");
        row2.put("departureTime", "2026-07-17 10:15:00");
        row2.put("arrivalTime", "2026-07-17 12:45:00");
        row2.put("tripNo", "CA4302");
        row2.put("seatNo", "32C");
        row2.put("companionCount", "1");
        row2.put("activityName", "西部数字经济论坛");
        row2.put("activityLocation", "成都世纪城新国际会展中心");
        row2.put("activityTime", "2026-07-17 15:00:00");
        row2.put("activityType", "行业论坛");
        row2.put("participateRole", "演讲嘉宾");
        row2.put("dataSource", "民航订票系统");
        row2.put("collectTime", "2026-07-17 08:00:00");
        dataList.add(row2);

        dynamicRespVO.setList(dataList);
        return dynamicRespVO;
    }

}

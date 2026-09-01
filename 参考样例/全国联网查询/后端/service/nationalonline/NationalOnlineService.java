package cn.sd.psdp.module.kyqb.service.nationalonline;

import cn.sd.psdp.framework.common.pojo.CommonResult;
import cn.sd.psdp.framework.common.pojo.PageResult;
import cn.sd.psdp.module.kyqb.controller.admin.nationalonline.vo.CommonQgrkjbxx;
import cn.sd.psdp.module.kyqb.controller.admin.nationalonline.vo.CommonQgrkjbxxParamRequest;
import cn.sd.psdp.module.kyqb.controller.admin.nationalonline.vo.NationalOnlineReqVO;
import cn.sd.psdp.module.kyqb.controller.admin.nationalonline.vo.NationalOnlineRespVO;

public interface NationalOnlineService {
    PageResult<NationalOnlineRespVO> getQgrkjbxxZjhm(NationalOnlineReqVO reqVO);
}

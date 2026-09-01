package cn.sd.psdp.module.kyqb.controller.admin.nationalonline.vo;


import lombok.Data;

import java.util.List;

@Data
public class WaPageData <T>  {
    private int pageNum;
    private int pageSize;
    private int pages;
    private int total;
    private List<T> list;
}

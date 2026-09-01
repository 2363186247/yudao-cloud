package cn.sd.psdp.module.kyqb.controller.admin.nationalonline.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.io.Serializable;

@Schema(description = "管理后台 - 全国人口基本信息 Response VO")
@Data
public class CommonQgrkjbxx implements Serializable {

    private static final long serialVersionUID = 1L;

    @Schema(description = "来源应用系统编号")
    @JsonProperty("J060034")
    private String j060034;

    @Schema(description = "数据资源标识符")
    @JsonProperty("J060008")
    private String j060008;

    @Schema(description = "源表主键字段md5")
    @JsonProperty("Z006703")
    private String z006703;

    @Schema(description = "按字段顺序的值计算的md5")
    @JsonProperty("Z006704")
    private String z006704;

    @Schema(description = "数据分类")
    @JsonProperty("Z005206")
    private String z005206;

    @Schema(description = "网络应用代码")
    @JsonProperty("H010001")
    private String h010001;

    @Schema(description = "证件类型")
    @JsonProperty("B030004")
    private String b030004;

    @Schema(description = "证件类型-中文")
    @JsonProperty("dic_B030004")
    private String dic_b030004;

    @Schema(description = "证件号码")
    @JsonProperty("B030005")
    private String b030005;

    @Schema(description = "中文姓名")
    @JsonProperty("B010001")
    private String b010001;

    @Schema(description = "户号（户口薄）")
    @JsonProperty("B030044")
    private String b030044;

    @Schema(description = "性别")
    @JsonProperty("B010011")
    private String b010011;

    @Schema(description = "性别-中文")
    @JsonProperty("dic_B010011")
    private String dic_b010011;

    @Schema(description = "出生日期")
    @JsonProperty("B010014")
    private String b010014;

    @Schema(description = "出生地")
    @JsonProperty("B010026")
    private String b010026;

    @Schema(description = "出生地-中文")
    @JsonProperty("dic_B010026")
    private String dic_b010026;

    @Schema(description = "户籍地行政区划代码")
    @JsonProperty("B030002")
    private String b030002;

    @Schema(description = "户籍地详细住址")
    @JsonProperty("B030011")
    private String b030011;

    @Schema(description = "监护人一公民身份号码")
    @JsonProperty("K000200")
    private String k000200;

    @Schema(description = "监护人二公民身份号码")
    @JsonProperty("K000759")
    private String k000759;

    @Schema(description = "父亲身份证号")
    @JsonProperty("K000084")
    private String k000084;

    @Schema(description = "母亲身份证")
    @JsonProperty("K000086")
    private String k000086;

    @Schema(description = "配偶身份证号")
    @JsonProperty("K000088")
    private String k000088;

    @Schema(description = "最后修改时间")
    @JsonProperty("ZHXGSJ")
    private String zhxgsj;

    @Schema(description = "数据来源系统")
    @JsonProperty("B050016")
    private String b050016;

    @Schema(description = "数据来源系统-中文")
    @JsonProperty("dic_B050016")
    private String dic_b050016;

    @Schema(description = "数据资源来源类型")
    @JsonProperty("J060052")
    private String j060052;

    @Schema(description = "数据来源表名")
    @JsonProperty("J010002")
    private String j010002;

    @Schema(description = "数据采集地点")
    @JsonProperty("F010008")
    private String f010008;

    @Schema(description = "数据采集地点-中文")
    @JsonProperty("dic_F010008")
    private String dic_f010008;

    @Schema(description = "信息入库时间")
    @JsonProperty("K000760")
    private String k000760;

    @Schema(description = "数据敏感级别")
    @JsonProperty("H010034")
    private String h010034;

    @Schema(description = "溯源ID")
    @JsonProperty("K000763")
    private String k000763;

    @Schema(description = "截获时间")
    @JsonProperty("H010014")
    private String h010014;

    @Schema(description = "提取备注")
    @JsonProperty("H090013")
    private String h090013;

    @Schema(description = "关联回填项标记")
    @JsonProperty("Z006815")
    private String z006815;

    @Schema(description = "数据标识项标记")
    @JsonProperty("Z006816")
    private String z006816;

    @Schema(description = "数据提取项标记")
    @JsonProperty("Z006817")
    private String z006817;

    @Schema(description = "扩展数据项标记")
    @JsonProperty("Z006818")
    private String z006818;

    @Schema(description = "汇聚库生成时间")
    @JsonProperty("Z006706")
    private String z006706;

    @Schema(description = "垃圾过滤标识")
    @JsonProperty("Z005205")
    private String z005205;

    @Schema(description = "数据包文件路径")
    @JsonProperty("H040003")
    private String h040003;

    @Schema(description = "来源应用系统编号")
    @JsonProperty("Z006814")
    private String z006814;

    @Schema(description = "姓名拼音")
    @JsonProperty("B010002")
    private String b010002;

    @Schema(description = "曾用名")
    @JsonProperty("B010005")
    private String b010005;

    @Schema(description = "曾用名拼音")
    @JsonProperty("B010006")
    private String b010006;

    @Schema(description = "与户主关系")
    @JsonProperty("H010009")
    private String h010009;

    @Schema(description = "与户主关系-中文")
    @JsonProperty("dic_H010009")
    private String dic_h010009;

    @Schema(description = "民族")
    @JsonProperty("B010012")
    private String b010012;

    @Schema(description = "民族-中文")
    @JsonProperty("dic_B010012")
    private String dic_b010012;

    @Schema(description = "文化程度")
    @JsonProperty("B030017")
    private String b030017;

    @Schema(description = "文化程度-中文")
    @JsonProperty("dic_B030017")
    private String dic_b030017;

    @Schema(description = "婚姻状况")
    @JsonProperty("B030016")
    private String b030016;

    @Schema(description = "婚姻状况-中文")
    @JsonProperty("dic_B030016")
    private String dic_b030016;

    @Schema(description = "兵役状况")
    @JsonProperty("B030015")
    private String b030015;

    @Schema(description = "兵役状况-中文")
    @JsonProperty("dic_B030015")
    private String dic_b030015;

    @Schema(description = "身高")
    @JsonProperty("B010017")
    private Long b010017;

    @Schema(description = "职业")
    @JsonProperty("B030024")
    private String b030024;

    @Schema(description = "籍贯")
    @JsonProperty("B010013")
    private String b010013;

    @Schema(description = "籍贯-中文")
    @JsonProperty("dic_B010013")
    private String dic_b010013;

    @Schema(description = "图片")
    @JsonProperty("H010028")
    private String h010028;

    @Schema(description = "暂住地详细住址")
    @JsonProperty("B030012")
    private String b030012;

    @Schema(description = "户口所在地")
    @JsonProperty("B030010")
    private String b030010;

    @Schema(description = "国家地区")
    @JsonProperty("B030001")
    private String b030001;

    @Schema(description = "国家地区-中文")
    @JsonProperty("dic_B030001")
    private String dic_b030001;

    @Schema(description = "固定电话")
    @JsonProperty("B020004")
    private String b020004;

    @Schema(description = "移动电话")
    @JsonProperty("B020005")
    private String b020005;

    @Schema(description = "注销标识")
    @JsonProperty("J030016")
    private String j030016;

    @Schema(description = "服务场所")
    @JsonProperty("E020007")
    private String e020007;

    @Schema(description = "有效期限")
    @JsonProperty("H010023")
    private String h010023;

    @Schema(description = "摘要/备注")
    @JsonProperty("I010009")
    private String i010009;

    @Schema(description = "操作时间")
    @JsonProperty("H100044")
    private String h100044;

    @Schema(description = "数据去重ID")
    @JsonProperty("I010058")
    private String i010058;

    @Schema(description = "监护人一家庭关系代码")
    @JsonProperty("K000197")
    private String k000197;

    @Schema(description = "监护人一姓名")
    @JsonProperty("K000198")
    private String k000198;

    @Schema(description = "监护人一姓名汉语拼音")
    @JsonProperty("K000199")
    private String k000199;

    @Schema(description = "监护人二家庭关系代码")
    @JsonProperty("K000756")
    private String k000756;

    @Schema(description = "监护人二姓名")
    @JsonProperty("K000757")
    private String k000757;

    @Schema(description = "监护人二姓名汉语拼音")
    @JsonProperty("K000758")
    private String k000758;

    @Schema(description = "父亲姓名")
    @JsonProperty("K000085")
    private String k000085;

    @Schema(description = "母亲姓名")
    @JsonProperty("K000087")
    private String k000087;

    @Schema(description = "配偶姓名")
    @JsonProperty("K000089")
    private String k000089;

    @Schema(description = "回填现住地经度")
    @JsonProperty("HT90023")
    private String ht90023;

    @Schema(description = "回填现住地纬度")
    @JsonProperty("HT90024")
    private String ht90024;

    @Schema(description = "主记录ID")
    @JsonProperty("H010042")
    private String h010042;

    @Schema(description = "原始系统接入主键")
    @JsonProperty("J010006")
    private String j010006;

    @Schema(description = "数据回溯标识符")
    @JsonProperty("K000761")
    private String k000761;

    @Schema(description = "提取规则版本标识")
    @JsonProperty("K000762")
    private String k000762;

    @Schema(description = "可信度")
    @JsonProperty("K000764")
    private String k000764;

    @Schema(description = "前端设备ID")
    @JsonProperty("H010018")
    private String h010018;

}

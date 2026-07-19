package cn.iocoder.yudao.module.search.controller.admin;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.StrUtil;
import cn.iocoder.yudao.framework.common.pojo.CommonResult;
import cn.iocoder.yudao.framework.common.pojo.PageResult;
import cn.iocoder.yudao.framework.common.util.object.BeanUtils;
import cn.iocoder.yudao.module.search.controller.admin.vo.SearchPageReqVO;
import cn.iocoder.yudao.module.search.controller.admin.vo.SearchDocumentRespVO;
import cn.iocoder.yudao.module.search.controller.admin.vo.SearchDocumentSaveReqVO;
import cn.iocoder.yudao.module.search.dal.mongodb.SearchDocument;
import cn.iocoder.yudao.module.search.service.SearchService;
import cn.iocoder.yudao.module.search.service.TranslationService;
import cn.iocoder.yudao.module.search.controller.admin.vo.TranslationReqVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.Valid;

import static cn.iocoder.yudao.framework.common.pojo.CommonResult.success;

@Tag(name = "管理后台 - 全文检索服务")
@RestController
@RequestMapping("/search")
@Validated
public class SearchController {

    @Resource
    private SearchService searchService;

    @Resource
    private TranslationService translationService;

    @PostMapping("/create")
    @Operation(summary = "创建/索引文档")
    @PreAuthorize("@ss.hasPermission('search:document:create')")
    public CommonResult<String> createSearchDocument(@Valid @RequestBody SearchDocumentSaveReqVO createReqVO) {
        String documentId = searchService.indexDocument(createReqVO);
        return success(documentId);
    }

    @PutMapping("/update")
    @Operation(summary = "修改文档")
    @PreAuthorize("@ss.hasPermission('search:document:update')")
    public CommonResult<Boolean> updateSearchDocument(@Valid @RequestBody SearchDocumentSaveReqVO updateReqVO) {
        searchService.updateSearchDocument(updateReqVO);
        return success(true);
    }

    @DeleteMapping("/delete")
    @Operation(summary = "删除文档")
    @Parameter(name = "id", description = "编号", required = true, example = "60c72b2f9b1d8e2a1c8f4b5a")
    @PreAuthorize("@ss.hasPermission('search:document:delete')")
    public CommonResult<Boolean> deleteSearchDocument(@RequestParam("id") String id) {
        searchService.deleteDocument(id);
        return success(true);
    }

    @GetMapping("/get")
    @Operation(summary = "获得文档")
    @Parameter(name = "id", description = "编号", required = true, example = "60c72b2f9b1d8e2a1c8f4b5a")
    // @PreAuthorize("@ss.hasPermission('search:document:query')")
    public CommonResult<SearchDocumentRespVO> getSearchDocument(@RequestParam("id") String id) {
        SearchDocument document = searchService.getSearchDocument(id);
        SearchDocumentRespVO vo = BeanUtils.toBean(document, SearchDocumentRespVO.class);
        if (vo != null && document != null) {
            vo.setTitleHighlight(document.getTitle()); // 默认返回原标题，前端详情页可进行局部高亮或由前端处理
        }
        return success(vo);
    }

    @GetMapping("/page")
    @Operation(summary = "获得文档分页")
    // @PreAuthorize("@ss.hasPermission('search:document:query')")
    public CommonResult<PageResult<SearchDocumentRespVO>> getSearchDocumentPage(@Valid SearchPageReqVO pageVO) {
        PageResult<SearchDocumentRespVO> pageResult = searchService.search(pageVO);
        return success(pageResult);
    }

    @PostMapping("/batch-import")
    @Operation(summary = "批量导入文档 JSON")
    // @PreAuthorize("@ss.hasPermission('search:document:create')")
    public CommonResult<Boolean> batchImportSearchDocuments(@Valid @RequestBody java.util.List<SearchDocumentSaveReqVO> importList) {
        searchService.batchImportSearchDocuments(importList);
        return success(true);
    }

    @PostMapping("/translate")
    @Operation(summary = "多语言智能翻译")
    public CommonResult<String> translate(@Valid @RequestBody TranslationReqVO reqVO) {
        String result = translationService.translate(reqVO.getText(), reqVO.getSourceLang(), reqVO.getTargetLang());
        return success(result);
    }
}

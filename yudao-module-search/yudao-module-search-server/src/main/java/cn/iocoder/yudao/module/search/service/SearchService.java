package cn.iocoder.yudao.module.search.service;

import cn.iocoder.yudao.framework.common.pojo.PageResult;
import cn.iocoder.yudao.module.search.controller.admin.vo.SearchPageReqVO;
import cn.iocoder.yudao.module.search.controller.admin.vo.SearchDocumentSaveReqVO;
import cn.iocoder.yudao.module.search.controller.admin.vo.SearchDocumentRespVO;
import cn.iocoder.yudao.module.search.dal.mongodb.SearchDocument;

import javax.validation.Valid;

public interface SearchService {

    /**
     * 创建/索引文档
     *
     * @param createReqVO 创建信息
     * @return 编号
     */
    String indexDocument(@Valid SearchDocumentSaveReqVO createReqVO);

    /**
     * 更新文档
     *
     * @param updateReqVO 更新信息
     */
    void updateSearchDocument(@Valid SearchDocumentSaveReqVO updateReqVO);

    /**
     * 删除文档
     *
     * @param id 编号
     */
    void deleteDocument(String id);

    /**
     * 获得文档
     *
     * @param id 编号
     * @return 文档
     */
    SearchDocument getSearchDocument(String id);

    /**
     * 全文检索与分页
     *
     * @param pageReqVO 检索分页查询
     * @return 文档分页结果
     */
    PageResult<SearchDocumentRespVO> search(SearchPageReqVO pageReqVO);

    /**
     * 批量导入文档
     *
     * @param importList 导入列表
     */
    void batchImportSearchDocuments(java.util.List<SearchDocumentSaveReqVO> importList);
}

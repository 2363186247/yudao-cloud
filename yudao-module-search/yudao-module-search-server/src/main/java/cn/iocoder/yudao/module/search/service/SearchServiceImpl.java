package cn.iocoder.yudao.module.search.service;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.StrUtil;
import cn.iocoder.yudao.framework.common.pojo.PageResult;
import cn.iocoder.yudao.framework.common.util.object.BeanUtils;
import cn.iocoder.yudao.module.search.controller.admin.vo.SearchPageReqVO;
import cn.iocoder.yudao.module.search.controller.admin.vo.SearchDocumentSaveReqVO;
import cn.iocoder.yudao.module.search.controller.admin.vo.SearchDocumentRespVO;
import cn.iocoder.yudao.module.search.dal.mongodb.SearchDocument;
import cn.iocoder.yudao.module.search.dal.mongodb.SearchDocumentRepository;
import cn.iocoder.yudao.module.search.framework.utils.SegmentationUtils;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.core.query.TextQuery;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static cn.iocoder.yudao.framework.common.exception.util.ServiceExceptionUtil.exception;
import static cn.iocoder.yudao.module.search.enums.ErrorCodeConstants.DOCUMENT_NOT_EXISTS;

@Service
@Validated
public class SearchServiceImpl implements SearchService {

    @Resource
    private SearchDocumentRepository searchDocumentRepository;

    @Resource
    private MongoOperations mongoTemplate;

    @Override
    public String indexDocument(SearchDocumentSaveReqVO createReqVO) {
        SearchDocument document = BeanUtils.toBean(createReqVO, SearchDocument.class);
        document.setSegmentedTitle(SegmentationUtils.segment(createReqVO.getTitle()));
        document.setSegmentedContent(SegmentationUtils.segment(createReqVO.getContent()));
        document.setCreateTime(LocalDateTime.now());
        searchDocumentRepository.save(document);
        return document.getId();
    }

    @Override
    public void updateSearchDocument(SearchDocumentSaveReqVO updateReqVO) {
        // 校验存在
        validateSearchDocumentExists(updateReqVO.getId());
        
        SearchDocument document = BeanUtils.toBean(updateReqVO, SearchDocument.class);
        document.setSegmentedTitle(SegmentationUtils.segment(updateReqVO.getTitle()));
        document.setSegmentedContent(SegmentationUtils.segment(updateReqVO.getContent()));
        SearchDocument oldDocument = searchDocumentRepository.findById(updateReqVO.getId()).orElse(null);
        if (oldDocument != null) {
            document.setCreateTime(oldDocument.getCreateTime());
        }
        searchDocumentRepository.save(document);
    }

    @Override
    public void deleteDocument(String id) {
        // 校验存在
        validateSearchDocumentExists(id);
        searchDocumentRepository.deleteById(id);
    }

    @Override
    public SearchDocument getSearchDocument(String id) {
        return searchDocumentRepository.findById(id).orElse(null);
    }

    @Override
    public PageResult<SearchDocumentRespVO> search(SearchPageReqVO pageReqVO) {
        String searchKey = pageReqVO.getSearchKey();
        String searchType = pageReqVO.getSearchType();
        
        Query query;
        boolean isFullText = false;
        if (StrUtil.isNotBlank(searchKey)) {
            if ("title".equals(searchType)) {
                query = new Query();
                query.addCriteria(Criteria.where("title").regex(searchKey, "i"));
            } else if ("content".equals(searchType)) {
                query = new Query();
                query.addCriteria(Criteria.where("content").regex(searchKey, "i"));
            } else {
                // 全文检索 (all) - 使用 MongoDB 文本索引与打分
                String segmentedKey = SegmentationUtils.segment(searchKey);
                TextCriteria criteria = TextCriteria.forDefaultLanguage().matching(segmentedKey);
                query = TextQuery.queryText(criteria);
                isFullText = true;
            }
        } else {
            query = new Query();
        }
        
        // 获取总数
        long total = mongoTemplate.count(query, SearchDocument.class);
        
        // 分页 (PageRequest 0-indexed)
        int pageNo = pageReqVO.getPageNo();
        int pageSize = pageReqVO.getPageSize();
        
        Pageable pageable;
        if (isFullText) {
            pageable = PageRequest.of(pageNo - 1, pageSize, Sort.by(Sort.Order.desc("score"), Sort.Order.desc("createTime")));
        } else {
            pageable = PageRequest.of(pageNo - 1, pageSize, Sort.by(Sort.Direction.DESC, "createTime"));
        }
        query.with(pageable);
        
        // 获取当前页数据
        List<SearchDocument> list = mongoTemplate.find(query, SearchDocument.class);
        
        // 转换成 RespVO 并设置高亮与摘要
        List<SearchDocumentRespVO> voList = BeanUtils.toBean(list, SearchDocumentRespVO.class);
        if (CollUtil.isNotEmpty(voList)) {
            // 提取用于高亮的关键词列表
            List<String> searchWords = SegmentationUtils.segmentToList(searchKey);
            for (int i = 0; i < voList.size(); i++) {
                SearchDocument doc = list.get(i);
                SearchDocumentRespVO vo = voList.get(i);
                vo.setScore(doc.getScore());
                // 仅当检索类型是 all 或者是 title 时，高亮标题
                if (StrUtil.isBlank(searchType) || "all".equals(searchType) || "title".equals(searchType)) {
                    vo.setTitleHighlight(highlightText(doc.getTitle(), searchWords));
                } else {
                    vo.setTitleHighlight(doc.getTitle());
                }
                // 仅当检索类型是 all 或者是 content 时，截取并高亮正文片段
                if (StrUtil.isBlank(searchType) || "all".equals(searchType) || "content".equals(searchType)) {
                    vo.setContentSnippetHighlight(getSnippet(doc.getContent(), searchWords));
                } else {
                    // 非正文搜索时，默认截取前80字符作为摘要
                    String content = doc.getContent();
                    vo.setContentSnippetHighlight(StrUtil.isNotBlank(content) && content.length() > 80 ? content.substring(0, 80) + "..." : content);
                }
            }
        }
        
        return new PageResult<>(voList, total);
    }

    private String highlightText(String text, List<String> searchWords) {
        if (StrUtil.isBlank(text) || CollUtil.isEmpty(searchWords)) {
            return text;
        }
        String highlighted = text;
        // 按长度降序排列关键词，防止短词破坏长词的高亮 HTML 标签
        List<String> sortedWords = searchWords.stream()
                .filter(StrUtil::isNotBlank)
                .sorted((w1, w2) -> Integer.compare(w2.length(), w1.length()))
                .collect(Collectors.toList());

        for (String word : sortedWords) {
            String escapedKey = java.util.regex.Pattern.quote(word);
            highlighted = highlighted.replaceAll("(?i)(" + escapedKey + ")", "<mark style=\"background-color: #ffeb3b; color: #000000; padding: 1px 3px; border-radius: 2px; font-weight: bold;\">$1</mark>");
        }
        return highlighted;
    }

    private String getSnippet(String content, List<String> searchWords) {
        if (StrUtil.isBlank(content)) {
            return "";
        }
        if (CollUtil.isEmpty(searchWords)) {
            return content.length() > 80 ? content.substring(0, 80) + "..." : content;
        }
        
        // 寻找任何一个关键词首次出现的最靠前的位置作为上下文原点
        int firstIdx = -1;
        int wordLen = 0;
        for (String word : searchWords) {
            if (StrUtil.isBlank(word)) {
                continue;
            }
            int idx = content.toLowerCase().indexOf(word.toLowerCase());
            if (idx != -1 && (firstIdx == -1 || idx < firstIdx)) {
                firstIdx = idx;
                wordLen = word.length();
            }
        }
        
        if (firstIdx == -1) {
            return content.length() > 80 ? content.substring(0, 80) + "..." : content;
        }
        
        int start = Math.max(0, firstIdx - 40);
        int end = Math.min(content.length(), firstIdx + wordLen + 40);
        
        String snippet = content.substring(start, end);
        if (start > 0) {
            snippet = "..." + snippet;
        }
        if (end < content.length()) {
            snippet = snippet + "...";
        }
        return highlightText(snippet, searchWords);
    }

    @Override
    public void batchImportSearchDocuments(List<SearchDocumentSaveReqVO> importList) {
        if (CollUtil.isEmpty(importList)) {
            return;
        }
        for (SearchDocumentSaveReqVO reqVO : importList) {
            SearchDocument document = BeanUtils.toBean(reqVO, SearchDocument.class);
            document.setSegmentedTitle(SegmentationUtils.segment(reqVO.getTitle()));
            document.setSegmentedContent(SegmentationUtils.segment(reqVO.getContent()));
            document.setCreateTime(LocalDateTime.now());
            searchDocumentRepository.save(document);
        }
    }

    private void validateSearchDocumentExists(String id) {
        if (id == null || !searchDocumentRepository.existsById(id)) {
            throw exception(DOCUMENT_NOT_EXISTS);
        }
    }
}

package cn.iocoder.yudao.module.search.service;

import cn.iocoder.yudao.framework.common.exception.ServiceException;
import cn.iocoder.yudao.framework.common.pojo.PageResult;
import cn.iocoder.yudao.framework.test.core.ut.BaseMockitoUnitTest;
import cn.iocoder.yudao.module.search.controller.admin.vo.SearchPageReqVO;
import cn.iocoder.yudao.module.search.controller.admin.vo.SearchDocumentRespVO;
import cn.iocoder.yudao.module.search.controller.admin.vo.SearchDocumentSaveReqVO;
import cn.iocoder.yudao.module.search.dal.mongodb.SearchDocument;
import cn.iocoder.yudao.module.search.dal.mongodb.SearchDocumentRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Query;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static cn.iocoder.yudao.framework.test.core.util.AssertUtils.assertServiceException;
import static cn.iocoder.yudao.module.search.enums.ErrorCodeConstants.DOCUMENT_NOT_EXISTS;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

public class SearchServiceImplTest extends BaseMockitoUnitTest {

    @InjectMocks
    private SearchServiceImpl searchService;

    @Mock
    private SearchDocumentRepository searchDocumentRepository;

    @Mock
    private MongoOperations mongoTemplate;

    @Test
    public void testIndexDocument_success() {
        // 准备参数
        SearchDocumentSaveReqVO reqVO = new SearchDocumentSaveReqVO()
                .setTitle("芋道源码测试")
                .setKeywords(Collections.singletonList("测试"))
                .setContent("内容详情");

        // mock repository.save，设置自增 ID
        when(searchDocumentRepository.save(any(SearchDocument.class))).thenAnswer(invocation -> {
            SearchDocument doc = invocation.getArgument(0);
            doc.setId("mock-doc-id-123");
            return doc;
        });

        // 调用
        String id = searchService.indexDocument(reqVO);

        // 验证
        assertEquals("mock-doc-id-123", id);
        verify(searchDocumentRepository, times(1)).save(any(SearchDocument.class));
    }

    @Test
    public void testUpdateSearchDocument_success() {
        // 准备参数
        SearchDocumentSaveReqVO reqVO = new SearchDocumentSaveReqVO()
                .setId("mock-doc-id-123")
                .setTitle("新标题")
                .setKeywords(Collections.singletonList("新标签"))
                .setContent("新正文");

        // mock check
        when(searchDocumentRepository.existsById("mock-doc-id-123")).thenReturn(true);
        SearchDocument oldDoc = new SearchDocument();
        oldDoc.setId("mock-doc-id-123");
        oldDoc.setCreateTime(LocalDateTime.of(2026, 7, 1, 10, 0));
        when(searchDocumentRepository.findById("mock-doc-id-123")).thenReturn(Optional.of(oldDoc));

        // 调用
        searchService.updateSearchDocument(reqVO);

        // 验证
        verify(searchDocumentRepository, times(1)).save(argThat(doc -> {
            assertEquals("mock-doc-id-123", doc.getId());
            assertEquals("新标题", doc.getTitle());
            assertEquals(LocalDateTime.of(2026, 7, 1, 10, 0), doc.getCreateTime()); // 保持创建时间不变
            return true;
        }));
    }

    @Test
    public void testUpdateSearchDocument_notFound() {
        // 准备参数
        SearchDocumentSaveReqVO reqVO = new SearchDocumentSaveReqVO()
                .setId("mock-doc-id-123")
                .setTitle("新标题");

        // mock check
        when(searchDocumentRepository.existsById("mock-doc-id-123")).thenReturn(false);

        // 调用与断言
        assertServiceException(() -> searchService.updateSearchDocument(reqVO), DOCUMENT_NOT_EXISTS);
    }

    @Test
    public void testDeleteDocument_success() {
        // mock
        when(searchDocumentRepository.existsById("mock-doc-id-123")).thenReturn(true);

        // 调用
        searchService.deleteDocument("mock-doc-id-123");

        // 验证
        verify(searchDocumentRepository, times(1)).deleteById("mock-doc-id-123");
    }

    @Test
    public void testDeleteDocument_notFound() {
        // mock
        when(searchDocumentRepository.existsById("mock-doc-id-123")).thenReturn(false);

        // 调用与断言
        assertServiceException(() -> searchService.deleteDocument("mock-doc-id-123"), DOCUMENT_NOT_EXISTS);
    }

    @Test
    public void testGetSearchDocument() {
        // mock
        SearchDocument mockDoc = new SearchDocument();
        mockDoc.setId("mock-doc-id-123");
        mockDoc.setTitle("标题");
        when(searchDocumentRepository.findById("mock-doc-id-123")).thenReturn(Optional.of(mockDoc));

        // 调用
        SearchDocument doc = searchService.getSearchDocument("mock-doc-id-123");

        // 验证
        assertNotNull(doc);
        assertEquals("mock-doc-id-123", doc.getId());
        assertEquals("标题", doc.getTitle());
    }

    @Test
    public void testSearch_fullTextWithHighlight() {
        // 准备参数 (搜索关键字 "Spring", 范围 all)
        SearchPageReqVO pageReqVO = new SearchPageReqVO();
        pageReqVO.setPageNo(1);
        pageReqVO.setPageSize(10);
        pageReqVO.setSearchType("all");
        pageReqVO.setSearchKey("Spring");

        // mock 数据库匹配文档
        SearchDocument mockDoc = new SearchDocument();
        mockDoc.setId("mock-doc-id-123");
        mockDoc.setTitle("Learning Spring Boot and MongoDB");
        mockDoc.setKeywords(Collections.singletonList("Spring"));
        mockDoc.setContent("In this tutorial, we will learn how to integrate Spring Boot with MongoDB database.");
        mockDoc.setScore(4.25f);
        mockDoc.setCreateTime(LocalDateTime.now());

        when(mongoTemplate.count(any(Query.class), eq(SearchDocument.class))).thenReturn(1L);
        when(mongoTemplate.find(any(Query.class), eq(SearchDocument.class))).thenReturn(Collections.singletonList(mockDoc));

        // 调用
        PageResult<SearchDocumentRespVO> result = searchService.search(pageReqVO);

        // 验证
        assertNotNull(result);
        assertEquals(1, result.getTotal());
        List<SearchDocumentRespVO> list = result.getList();
        assertEquals(1, list.size());
        
        SearchDocumentRespVO vo = list.get(0);
        assertEquals("mock-doc-id-123", vo.getId());
        assertEquals(4.25f, vo.getScore());
        // 验证高亮标记 <mark ...>
        assertTrue(vo.getTitleHighlight().contains("<mark"));
        assertTrue(vo.getTitleHighlight().contains("Spring"));
        assertTrue(vo.getContentSnippetHighlight().contains("<mark"));
    }
}

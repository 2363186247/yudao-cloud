package cn.iocoder.yudao.module.search.controller.admin;

import cn.iocoder.yudao.framework.common.pojo.PageResult;
import cn.iocoder.yudao.framework.common.util.json.JsonUtils;
import cn.iocoder.yudao.framework.test.core.ut.BaseMockitoUnitTest;
import cn.iocoder.yudao.module.search.controller.admin.vo.SearchDocumentRespVO;
import cn.iocoder.yudao.module.search.controller.admin.vo.SearchDocumentSaveReqVO;
import cn.iocoder.yudao.module.search.dal.mongodb.SearchDocument;
import cn.iocoder.yudao.module.search.service.SearchService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Collections;

import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class SearchControllerTest extends BaseMockitoUnitTest {

    private MockMvc mockMvc;

    @InjectMocks
    private SearchController searchController;

    @Mock
    private SearchService searchService;

    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(searchController).build();
    }

    @Test
    public void testCreateSearchDocument_success() throws Exception {
        // 准备参数与 Mock
        SearchDocumentSaveReqVO reqVO = new SearchDocumentSaveReqVO()
                .setTitle("测试标题")
                .setContent("测试正文")
                .setKeywords(Collections.singletonList("测试"));

        when(searchService.indexDocument(any(SearchDocumentSaveReqVO.class))).thenReturn("mock-id-999");

        // 执行请求与校验
        mockMvc.perform(post("/search/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(JsonUtils.toJsonString(reqVO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code", is(0)))
                .andExpect(jsonPath("$.data", is("mock-id-999")));

        verify(searchService, times(1)).indexDocument(any(SearchDocumentSaveReqVO.class));
    }

    @Test
    public void testUpdateSearchDocument_success() throws Exception {
        // 准备参数
        SearchDocumentSaveReqVO reqVO = new SearchDocumentSaveReqVO()
                .setId("mock-id-999")
                .setTitle("更新标题")
                .setContent("更新正文")
                .setKeywords(Collections.singletonList("新标签"));

        // 执行请求与校验
        mockMvc.perform(put("/search/update")
                .contentType(MediaType.APPLICATION_JSON)
                .content(JsonUtils.toJsonString(reqVO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code", is(0)))
                .andExpect(jsonPath("$.data", is(true)));

        verify(searchService, times(1)).updateSearchDocument(any(SearchDocumentSaveReqVO.class));
    }

    @Test
    public void testDeleteSearchDocument_success() throws Exception {
        // 执行请求与校验
        mockMvc.perform(delete("/search/delete")
                .param("id", "mock-id-999"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code", is(0)))
                .andExpect(jsonPath("$.data", is(true)));

        verify(searchService, times(1)).deleteDocument(eq("mock-id-999"));
    }

    @Test
    public void testGetSearchDocument_success() throws Exception {
        // Mock
        SearchDocument mockDoc = new SearchDocument();
        mockDoc.setId("mock-id-999");
        mockDoc.setTitle("测试标题");
        mockDoc.setContent("测试内容");
        when(searchService.getSearchDocument("mock-id-999")).thenReturn(mockDoc);

        // 执行请求与校验
        mockMvc.perform(get("/search/get")
                .param("id", "mock-id-999"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code", is(0)))
                .andExpect(jsonPath("$.data.id", is("mock-id-999")))
                .andExpect(jsonPath("$.data.title", is("测试标题")));

        verify(searchService, times(1)).getSearchDocument(eq("mock-id-999"));
    }

    @Test
    public void testGetSearchDocumentPage_success() throws Exception {
        // Mock
        SearchDocumentRespVO vo = new SearchDocumentRespVO();
        vo.setId("mock-id-999");
        vo.setTitleHighlight("测试<mark>标题</mark>");
        vo.setContentSnippetHighlight("测试内容Snippet");
        PageResult<SearchDocumentRespVO> pageResult = new PageResult<>(Collections.singletonList(vo), 1L);
        
        when(searchService.search(any())).thenReturn(pageResult);

        // 执行请求与校验
        mockMvc.perform(get("/search/page")
                .param("pageNo", "1")
                .param("pageSize", "10")
                .param("searchKey", "标题"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code", is(0)))
                .andExpect(jsonPath("$.data.total", is(1)))
                .andExpect(jsonPath("$.data.list[0].id", is("mock-id-999")))
                .andExpect(jsonPath("$.data.list[0].titleHighlight", is("测试<mark>标题</mark>")));
    }
}

package cn.iocoder.yudao.module.search.dal.mongodb;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.TextScore;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Document(collection = "search_document")
@Data
public class SearchDocument {
    @Id
    private String id;
    
    /**
     * 文档标题
     */
    private String title;

    /**
     * 分词后标题 (仅用于全文索引构建与检索匹配)
     */
    @TextIndexed(weight = 10)
    private String segmentedTitle;
    
    /**
     * 文档关键字/标签
     */
    @TextIndexed(weight = 5)
    private List<String> keywords;
    
    /**
     * 文档正文内容
     */
    private String content;

    /**
     * 分词后正文内容 (仅用于全文索引构建与检索匹配)
     */
    @TextIndexed(weight = 1)
    private String segmentedContent;
    
    /**
     * 相关度排序得分
     */
    @TextScore
    private Float score;

    /**
     * 创建时间
     */
    private LocalDateTime createTime;

    /**
     * 其他自定义动态字段
     */
    private Map<String, Object> extra;
}

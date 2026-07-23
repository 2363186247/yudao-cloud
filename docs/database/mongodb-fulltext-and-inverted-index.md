[← 返回主技术说明文档](../全文检索服务构建与学习文档.md)

# MongoDB 全文检索、倒排索引与 Jieba 中文分词机制规范

本文档阐述 MongoDB 全文检索技术实现、倒排索引（Inverted Index）数据结构与得分计算算法，以及 Jieba 分词器（`jieba-analysis`）在中文环境下的集成方案。

---

## 1. 核心概念规范

### 1.1 MongoDB 全文检索 (Full-Text Search)
基于倒排索引机制的高级文本匹配引擎。在文档字段上建立 `text` 索引后，能够将长文本分割为独立词项（Term），并根据词频与字段权重计算相关度得分（`$textScore`），实现精准的高召回率检索。

### 1.2 中文分词器 (Segmenter / Tokenizer)
英文文本天然以空格作为词汇分隔符，而中文文本为连续字符串。分词器用于在文本写入与检索前，将连续语句切割为有独立语义的词汇序列。本项目采用 `jieba-analysis` 库完成前置分词预处理。

---

## 2. 倒排索引 (Inverted Index) 构建与打分机制

### 2.1 倒排列表 (Posting List) 构建
对于标注了 `@TextIndexed` 的字段，WiredTiger 引擎提取文本并切词后，生成从**词项 (Term) 到文档 ID 列表**的倒排映射字典：

| 词项 (Term) | 倒排列表 Posting List (包含该词的文档、字段及权重) |
| :--- | :--- |
| **Nacos** | `[(doc_01, segmentedTitle, 权重=10), (doc_02, segmentedTitle, 权重=10)]` |
| **索引** | `[(doc_01, segmentedTitle, 权重=10)]` |

### 2.2 相关度得分 (Relevance Scoring) 计算
检索时直接对关键词的 Posting List 求交集/并集定位目标文档，并依照以下公式计算综合分值：

$$\text{Score} = \sum (\text{TF} \times \text{IDF} \times \text{Field Weight})$$

*   **词频 (TF - Term Frequency)**：关键词在当前文档中出现的频次。
*   **逆文档频率 (IDF - Inverse Document Frequency)**：关键词在全库文档中的稀缺程度。
*   **字段权重 (Field Weight)**：`@TextIndexed(weight = xxx)` 指定的配置权重（标题 `10`、标签 `5`、正文 `1`）。

---

## 3. 文档实体类 [SearchDocument.java](../../yudao-module-search/yudao-module-search-server/src/main/java/cn/iocoder/yudao/module/search/dal/mongodb/SearchDocument.java) 注解规范

```java
package cn.iocoder.yudao.module.search.dal.mongodb;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.TextScore;

@Document(collection = "search_document")
@Data
public class SearchDocument {
    @Id
    private String id; // 主键 ID

    private String title; // 原始标题 (界面展现)

    @TextIndexed(weight = 10) // 权重 10
    private String segmentedTitle; // 分词后标题 (索引匹配)

    @TextIndexed(weight = 5)  // 权重 5
    private List<String> keywords; // 标签列表

    private String content; // 原始正文

    @TextIndexed(weight = 1)  // 权重 1
    private String segmentedContent; // 分词后正文 (索引匹配)

    @TextScore
    private Float score; // 检索相关度得分 ($textScore 自动注入)

    private LocalDateTime createTime;
}
```

---

## 4. 索引自动初始化器 [MongoIndexInitializer.java](../../yudao-module-search/yudao-module-search-server/src/main/java/cn/iocoder/yudao/module/search/framework/config/MongoIndexInitializer.java) 规范

```java
@Component
@Slf4j
public class MongoIndexInitializer implements CommandLineRunner {

    @Resource
    private MongoTemplate mongoTemplate;

    @Override
    public void run(String... args) {
        TextIndexDefinition textIndex = new TextIndexDefinition.TextIndexDefinitionBuilder()
                .onField("segmentedTitle", 10F)
                .onField("keywords", 5F)
                .onField("segmentedContent", 1F)
                .named("search_text_index")
                .withDefaultLanguage("none") // 禁用英文词干化规则，保护中文切词结构
                .build();
        mongoTemplate.indexOps(SearchDocument.class).ensureIndex(textIndex);
    }
}
```

*   **`CommandLineRunner`**：容器启动就绪后自动触发执行。
*   **`.withDefaultLanguage("none")`**：禁用默认的英文字干化（Word Stemming）规则，防止系统误将中文切词后的词汇修改破坏。

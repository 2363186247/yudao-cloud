[← 返回主技术说明文档](../全文检索服务构建与学习文档.md)

# MongoDB 双模检索架构、倒排索引与 Jieba 分词工具设计规范

本文档阐述 [SearchServiceImpl.java](../../yudao-module-search/yudao-module-search-server/src/main/java/cn/iocoder/yudao/module/search/service/SearchServiceImpl.java) 中实现的 MongoDB **双模式检索架构**（正则模糊匹配 vs 倒排索引全文匹配）、倒排索引（Inverted Index）打分计算公式，以及 [SegmentationUtils.java](../../yudao-module-search/yudao-module-search-server/src/main/java/cn/iocoder/yudao/module/search/framework/utils/SegmentationUtils.java) 分词工具类的封装规范。

---

## 1. 检索架构双模式设计 (Regex vs Full-Text Index)

系统在 [SearchServiceImpl.java](../../yudao-module-search/yudao-module-search-server/src/main/java/cn/iocoder/yudao/module/search/service/SearchServiceImpl.java) 中支持两种不同的搜索模式，以满足精确字段过滤与全库相关度匹配的需求：

```java
Query query;
boolean isFullText = false;
if (StrUtil.isNotBlank(searchKey)) {
    if ("title".equals(searchType)) {
        // 模式 A：特定字段正则模糊检索 (LIKE 精确匹配)
        query = new Query();
        query.addCriteria(Criteria.where("title").regex(searchKey, "i"));
    } else if ("content".equals(searchType)) {
        query = new Query();
        query.addCriteria(Criteria.where("content").regex(searchKey, "i"));
    } else {
        // 模式 B：全局倒排索引全文检索 (Text Search + 相关度打分)
        String segmentedKey = SegmentationUtils.segment(searchKey);
        TextCriteria criteria = TextCriteria.forDefaultLanguage().matching(segmentedKey);
        query = TextQuery.queryText(criteria);
        isFullText = true;
    }
}
```

### 1.1 模式 A：特定字段正则模糊检索 (`Criteria.where().regex()`)
*   **适用场景**：用户明确指定仅对 `title` 或 `content` 单个字段进行精确子串查找。
*   **技术实现**：构造 `Criteria.where("title").regex(searchKey, "i")`。`"i"` 表示忽略大小写。
*   **排序机制**：此模式不计算全文相关度得分，默认按创建时间降序排列：`Sort.by(Sort.Direction.DESC, "createTime")`。

### 1.2 模式 B：全局倒排索引全文检索 (`TextCriteria.matching()`)
*   **适用场景**：全局综合搜索（`searchType = "all"` 或为空）。
*   **技术实现**：先调用 `SegmentationUtils.segment(searchKey)` 对搜索词进行切词，再通过 `TextCriteria.forDefaultLanguage().matching(segmentedKey)` 构造文本检索条件。
*   **排序机制**：开启全文打分排序，优先按相关度得分降序，得分相同时按创建时间降序：`Sort.by(Sort.Order.desc("score"), Sort.Order.desc("createTime"))`。

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

## 3. 分词工具类设计 ([SegmentationUtils.java](../../yudao-module-search/yudao-module-search-server/src/main/java/cn/iocoder/yudao/module/search/framework/utils/SegmentationUtils.java))

```java
package cn.iocoder.yudao.module.search.framework.utils;

import cn.hutool.core.util.StrUtil;
import com.huaban.analysis.jieba.JiebaSegmenter;
import com.huaban.analysis.jieba.SegToken;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class SegmentationUtils {

    private static final JiebaSegmenter SEGMENTER = new JiebaSegmenter();

    public static String segment(String text) {
        if (StrUtil.isBlank(text)) {
            return "";
        }
        List<SegToken> tokens = SEGMENTER.process(text, JiebaSegmenter.SegMode.SEARCH);
        return tokens.stream()
                .map(token -> token.word)
                .filter(StrUtil::isNotBlank)
                .collect(Collectors.joining(" "));
    }

    public static List<String> segmentToList(String text) {
        if (StrUtil.isBlank(text)) {
            return Collections.emptyList();
        }
        List<SegToken> tokens = SEGMENTER.process(text, JiebaSegmenter.SegMode.SEARCH);
        return tokens.stream()
                .map(token -> token.word)
                .filter(StrUtil::isNotBlank)
                .distinct()
                .collect(Collectors.toList());
    }
}
```

*   **线程安全单例**：静态实例化 `JiebaSegmenter`，避免每次切词重复创建分词器开销。
*   **搜索模式 (`SegMode.SEARCH`)**：启用 Jieba 的搜索引擎细粒度切词模式，对长词再次进行二次拆分，提高检索召回率。
*   **空格拼接与去重列表**：`segment` 方法返回由空格连接的字符串（写入 `segmentedTitle` 与 `segmentedContent`）；`segmentToList` 返回去重后的词汇列表（供高亮算法使用）。

---

## 4. Spring Data 分页偏移量转换规范

前端分页参数 `pageNo` 通常从 `1` 开始（1-indexed），而 Spring Data 的 `PageRequest.of(page, size)` 要求页码从 `0` 开始（0-indexed）：

```java
int pageNo = pageReqVO.getPageNo();
int pageSize = pageReqVO.getPageSize();
Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sort);
query.with(pageable);
```

通过 `pageNo - 1` 完成转换，并将总记录数 `total` 与当前页列表组装为通用 `PageResult<>(voList, total)` 对象返回。

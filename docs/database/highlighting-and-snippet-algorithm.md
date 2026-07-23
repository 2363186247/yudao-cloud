[← 返回主技术说明文档](../全文检索服务构建与学习文档.md)

# 检索高亮标签防破坏算法与动态正文切片摘要提取算法规范

本文档阐述 [SearchServiceImpl.java](../../yudao-module-search/yudao-module-search-server/src/main/java/cn/iocoder/yudao/module/search/service/SearchServiceImpl.java) 中实现的动态正文上下文切片摘要提取算法（Snippet Extraction）以及关键词 HTML 高亮标签防破坏算法（Highlighting Algorithm）。

---

## 1. 动态正文上下文切片摘要提取算法 (`getSnippet`)

在全文检索中，正文内容可能长达数万字。前端列表页无法展示全部正文，需要根据检索关键词**动态定位关键词在正文中首次出现的位置，并提取前后上下文窗口片段**。

### 1.1 算法实现原理

```java
private String getSnippet(String content, List<String> searchWords) {
    if (StrUtil.isBlank(content)) {
        return "";
    }
    if (CollUtil.isEmpty(searchWords)) {
        return content.length() > 80 ? content.substring(0, 80) + "..." : content;
    }
    
    // 1. 寻找任意一个关键词在正文中首次出现的最小索引位置
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
    
    // 2. 未命中任何关键词，默认截取前 80 字符
    if (firstIdx == -1) {
        return content.length() > 80 ? content.substring(0, 80) + "..." : content;
    }
    
    // 3. 计算以关键词为中心的动态上下文窗口 [-40, +40]
    int start = Math.max(0, firstIdx - 40);
    int end = Math.min(content.length(), firstIdx + wordLen + 40);
    
    String snippet = content.substring(start, end);
    if (start > 0) {
        snippet = "..." + snippet;
    }
    if (end < content.length()) {
        snippet = snippet + "...";
    }
    
    // 4. 对提取出的上下文片段进行 HTML 高亮渲染
    return highlightText(snippet, searchWords);
}
```

### 1.2 算法关键步骤
1.  **关键词首发位置搜索**：遍历切词后的所有搜索关键词，使用忽略大小写的 `indexOf` 计算所有关键词在正文中出现的最小起始下标 `firstIdx`。
2.  **动态窗口计算**：以 `firstIdx` 为原点，向左扩展 40 字符（边界卡点为 0），向右扩展 `wordLen + 40` 字符（边界卡点为正文总长度），截取出 80~100 字符的黄金阅读片段。
3.  **省略号补全**：若截取起始点 `start > 0` 则前置拼接 `...`；若截取终点 `end < content.length()` 则后置拼接 `...`。

---

## 2. 关键词 HTML 高亮标签防破坏算法 (`highlightText`)

在对匹配文本包装 HTML 高亮标签（如 `<mark style="...">关键词</mark>`）时，存在一个经典工程 Bug：**如果搜索关键词列表中同时存在包含关系的长短词（例如 `"Spring"` 与 `"SpringBoot"`），短词的正则替换可能会误将长词替换破坏，或者误侵入已生成的 HTML 标签内部字符串（如误替换 `<mark>` 中的 `mark`）**。

### 2.1 算法实现原理

```java
private String highlightText(String text, List<String> searchWords) {
    if (StrUtil.isBlank(text) || CollUtil.isEmpty(searchWords)) {
        return text;
    }
    String highlighted = text;
    
    // 1. 按字符串长度降序排列关键词 (长词优先替换，防止短词破坏长词结构)
    List<String> sortedWords = searchWords.stream()
            .filter(StrUtil::isNotBlank)
            .sorted((w1, w2) -> Integer.compare(w2.length(), w1.length()))
            .collect(Collectors.toList());

    // 2. 循环使用正则表达式进行忽略大小写替换，并利用捕获组 $1 保留原始大小写
    for (String word : sortedWords) {
        String escapedKey = java.util.regex.Pattern.quote(word);
        highlighted = highlighted.replaceAll("(?i)(" + escapedKey + ")", 
            "<mark style=\"background-color: #ffeb3b; color: #000000; padding: 1px 3px; border-radius: 2px; font-weight: bold;\">$1</mark>");
    }
    return highlighted;
}
```

### 2.2 算法三大核心防护机制
1.  **按字符长度降序排序 (Length-Desc Sorting)**：
    使用 `sorted((w1, w2) -> Integer.compare(w2.length(), w1.length()))` 保证优先替换长度较长的词项（如先替换 `"SpringBoot"`，再替换 `"Spring"`）。避免了短词先被替换生成 `<mark>Spring</mark>Boot` 后，再替换短词导致 HTML 标签嵌套错乱损坏。
2.  **正则特殊字符转义 (`Pattern.quote`)**：
    搜索关键词中可能包含正则元字符（如 `.`、`*`、`?`、`(`、`)`）。使用 `Pattern.quote(word)` 将关键词包裹为 `\Qword\E` 文本转义序列，防止正则表达式语法报错。
3.  **忽略大小写比对与捕获组原始保留 (`(?i)` + `$1`)**：
    正则表达式添加 `(?i)` 模式修饰符实现忽略大小写匹配（如匹配 `nacos`、`NACOS`、`Nacos`）；在替换结果中使用捕获组 `$1`，确保替换后的文本保持文章原文的大小写排版格式，而不会强制被统一改写。

package cn.iocoder.yudao.module.search.framework.config;

import cn.iocoder.yudao.module.search.dal.mongodb.SearchDocument;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.IndexInfo;
import org.springframework.data.mongodb.core.index.TextIndexDefinition;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

@Component
@Slf4j
public class MongoIndexInitializer implements CommandLineRunner {

    @Resource
    private MongoTemplate mongoTemplate;

    @Override
    public void run(String... args) {
        log.info("[MongoIndexInitializer] 正在检查并初始化 MongoDB 全文检索索引...");
        try {
            boolean hasOldTextIndex = false;
            boolean hasNewTextIndex = false;
            // 获取已有索引
            List<IndexInfo> indexInfos = mongoTemplate.indexOps(SearchDocument.class).getIndexInfo();
            for (IndexInfo info : indexInfos) {
                if (info.getName().contains("text") || info.getIndexFields().stream().anyMatch(f -> f.isText())) {
                    // 检查是否包含旧的索引字段 "title" 或 "content"
                    boolean usesOldFields = info.getIndexFields().stream().anyMatch(f -> "title".equals(f.getKey()) || "content".equals(f.getKey()));
                    if (usesOldFields) {
                        hasOldTextIndex = true;
                    } else {
                        hasNewTextIndex = true;
                    }
                }
            }

            if (hasOldTextIndex) {
                log.info("[MongoIndexInitializer] 检测到旧的全文索引 (使用未分词字段)，正在删除以重新构建新的分词索引...");
                try {
                    mongoTemplate.indexOps(SearchDocument.class).dropIndex("search_text_index");
                } catch (Exception ex) {
                    log.warn("[MongoIndexInitializer] 删除旧索引失败，尝试使用集合重建", ex);
                }
                hasNewTextIndex = false;
            }

            if (!hasNewTextIndex) {
                log.info("[MongoIndexInitializer] 未检测到新版全文索引，开始创建复合全文索引...");
                TextIndexDefinition textIndex = new TextIndexDefinition.TextIndexDefinitionBuilder()
                        .onField("segmentedTitle", 10F)
                        .onField("keywords", 5F)
                        .onField("segmentedContent", 1F)
                        .named("search_text_index")
                        .withDefaultLanguage("none") // 指定中文分词忽略的默认语言设置（即不按特定的非中文字典解析）
                        .build();
                mongoTemplate.indexOps(SearchDocument.class).ensureIndex(textIndex);
                log.info("[MongoIndexInitializer] 复合全文索引创建成功！");
            } else {
                log.info("[MongoIndexInitializer] 新版分词全文索引已存在，无需初始化。");
            }
        } catch (Exception e) {
            log.error("[MongoIndexInitializer] 初始化 MongoDB 全文索引失败！", e);
        }
    }
}

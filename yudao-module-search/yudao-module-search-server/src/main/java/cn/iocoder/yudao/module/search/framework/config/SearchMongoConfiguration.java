package cn.iocoder.yudao.module.search.framework.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackages = "cn.iocoder.yudao.module.search.dal.mongodb")
public class SearchMongoConfiguration {
}

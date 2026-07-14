package cn.iocoder.yudao.module.search;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * 全文检索微服务启动入口类
 *
 * @author Antigravity
 */
@SpringBootApplication
public class SearchServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(SearchServerApplication.class, args);
    }

}

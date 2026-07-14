package cn.iocoder.yudao.module.search.framework.security.config;

import cn.iocoder.yudao.framework.security.config.AuthorizeRequestsCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AuthorizeHttpRequestsConfigurer;

/**
 * Search 模块的 Security 配置
 */
@Configuration(proxyBeanMethods = false, value = "searchSecurityConfiguration")
public class SecurityConfiguration {

    @Bean("searchAuthorizeRequestsCustomizer")
    public AuthorizeRequestsCustomizer authorizeRequestsCustomizer() {
        return new AuthorizeRequestsCustomizer() {

            @Override
            public void customize(AuthorizeHttpRequestsConfigurer<HttpSecurity>.AuthorizationManagerRequestMatcherRegistry registry) {
                // Swagger 接口文档
                registry.requestMatchers("/v3/api-docs/**").permitAll()
                        .requestMatchers("/webjars/**").permitAll()
                        .requestMatchers("/swagger-ui").permitAll()
                        .requestMatchers("/swagger-ui/**").permitAll();
                // Spring Boot Actuator 的安全配置
                registry.requestMatchers("/actuator").permitAll()
                        .requestMatchers("/actuator/**").permitAll();
                
                // 全文检索的所有接口放行，以方便 Gateway 转发与开发联调测试
                registry.requestMatchers("/admin-api/search/**").permitAll()
                        .requestMatchers("/search/**").permitAll();
            }

        };
    }

}

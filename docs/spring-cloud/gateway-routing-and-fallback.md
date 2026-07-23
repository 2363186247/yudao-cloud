[← 返回主技术说明文档](../全文检索服务构建与学习文档.md)

# Spring Cloud Gateway 网关路由分发与“单体+微服务”混合架构规范

本文档阐述网关 `yudao-gateway`（端口 18081）路由分发机制、谓词断言规则，以及本地开发场景下“单体+微服务”混合架构的兜底转发设计。

---

## 1. 基础设施概念规范

### 1.1 Nacos 注册中心 (Service Registry)
Nacos 为微服务提供服务注册与动态发现支持。`search-server` 启动后将自身的 IP（`127.0.0.1`）与端口（`18082`）自动注册至 Nacos。网关通过服务名 `search-server` 向 Nacos 查询活跃节点，实现无硬编码的动态寻址与负载均衡。

### 1.2 网关 (Spring Cloud Gateway)
微服务集群的唯一统一入口，负责安全鉴权（Bearer Token 校验）、动态路由转发、路径重写及全局跨域处理。在新增微服务时，仅需更新 YAML 路由配置，无需重构网关底层 Java 代码。

---

## 2. 真实路由配置文件分工

网关服务的路由表定义在 `yudao-gateway/src/main/resources/` 下：
*   [application.yaml](../../yudao-gateway/src/main/resources/application.yaml)：全量微服务独立部署模式下的全量路由表基线。
*   [application-local.yaml](../../yudao-gateway/src/main/resources/application-local.yaml)：本地开发场景下的路由表覆写，包含混合架构**兜底转发规则**。
*   [application-dev.yaml](../../yudao-gateway/src/main/resources/application-dev.yaml)：开发测试服务器环境配置。

---

## 3. 单体+微服务“混合开发架构”与兜底转发原理

### 3.1 架构背景
在本地开发场景下，运行 15+ 个独立的微服务 JVM 实例会消耗极高内存。框架提供了一个聚合单体应用进程 `yudao-server`（运行在 18080 端口），将基础模块打包整合；而独立演进的子功能（如 `search-server`，运行在 18082 端口）则作为单独微服务启动。

### 3.2 路由配置实现 ([application-local.yaml](../../yudao-gateway/src/main/resources/application-local.yaml))

```yaml
spring:
  cloud:
    gateway:
      routes:
        # 1. 精确匹配：优先路由至独立的 search-server 微服务 (18082 端口)
        - id: search-admin-api
          uri: grayLb://search-server
          predicates:
            - Path=/admin-api/search/**
          filters:
            - RewritePath=/admin-api/search/v3/api-docs, /v3/api-docs

        # 2. 兜底匹配：凡是其他未单独拆分的 /admin-api/** 请求，一律转发至本地单体 yudao-server (18080 端口)
        - id: monolithic-backend-admin-api
          uri: http://127.0.0.1:18080
          predicates:
            - Path=/admin-api/**
```

---

## 4. 精确路由 (Explicit Route) vs 兜底路由 (Fallback Route)

Spring Cloud Gateway 依照 YAML 中的配置顺序及 Path 前缀精度依次比对谓词断言：

1.  **精确路由**：匹配路径 `/admin-api/search/**`，通过 `grayLb://search-server` 转发至注册中心发现的 18082 节点。
2.  **兜底路由**：匹配广义路径 `/admin-api/**`，将所有未单独拆分模块的请求静态转发至 `http://127.0.0.1:18080` 单体服务。

| 维度 | 精确路由 (Explicit Route) | 兜底路由 (Fallback Route) |
| :--- | :--- | :--- |
| **Path 断言规则** | 具体模块前缀（如 `/admin-api/search/**`） | 全局广义通配符（如 `/admin-api/**`） |
| **目标 URI 语法** | `grayLb://search-server`（动态负载均衡） | `http://127.0.0.1:18080`（直连单体端口） |
| **设计目的** | 独立拆分与部署的微服务路由 | 兼容未单独拆分的基础模块，降低开发内存开销 |
| **匹配优先级** | 高优先级（优先比对） | 低优先级（兜底捕获未匹配请求） |

---

## 5. 网关配置核心语法要素

1.  **`id`**：路由唯一标识。
2.  **`uri`**：目标转发地址。`grayLb://` 代表启用灰度与动态负载均衡寻址。
3.  **`predicates`**：断言条件，如 `- Path=/admin-api/search/**`。
4.  **`filters`**：过滤器逻辑，如 `- RewritePath=/admin-api/search/v3/api-docs, /v3/api-docs` 完成 Swagger 接口文档路径重写。

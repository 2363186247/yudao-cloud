[← 返回主技术说明文档](../全文检索服务构建与学习文档.md)

# RESTful Controller 控制层、VO/DO 分层与 Spring Security SpEL 权限校验规范

本文档阐述控制层 [SearchController.java](../../yudao-module-search/yudao-module-search-server/src/main/java/cn/iocoder/yudao/module/search/controller/admin/SearchController.java) 的设计规范、VO/DO 数据分层、JSR-303 参数校验、Spring Security SpEL 声明式权限控制，以及 Knife4j (OpenAPI v3) 接口文档标注规范。

---

## 1. RESTful 控制层架构与 VO / DO 分层设计

### 1.1 数据对象分层 (VO / DTO / DO)
为了保障数据库结构不直接暴露给前端，并区分“入参校验”与“出参展示”，项目严格划分为以下三层数据对象：
*   **DO (Data Object - 数据实体对象)**：如 `SearchDocument.java`，直接与 MongoDB 数据库集合字段一一映射。
*   **ReqVO (Request Value Object - 请求参数对象)**：如 `SearchDocumentSaveReqVO.java`、`SearchPageReqVO.java`、`TranslationReqVO.java`，专用于接收并校验前端传入的 HTTP 请求参数。
*   **RespVO (Response Value Object - 响应结果对象)**：如 `SearchDocumentRespVO.java`，专用于封装返回给前端的视图数据，包含高亮标题 `titleHighlight` 与正文高亮摘要 `contentSnippetHighlight`。

### 1.2 对象的深拷贝与隔离 (`BeanUtils.toBean`)
使用 `BeanUtils.toBean(source, Target.class)` 实现 VO 与 DO 之间的属性拷贝与解耦，避免手写繁琐的 Getter/Setter 赋值代码。

---

## 2. JSR-303 声明式参数校验与统一响应封装

```java
@PostMapping("/create")
@Operation(summary = "创建/索引文档")
public CommonResult<String> createSearchDocument(@Valid @RequestBody SearchDocumentSaveReqVO createReqVO) {
    String documentId = searchService.indexDocument(createReqVO);
    return success(documentId);
}
```

*   **`@Validated`与 `@Valid`**：在 Controller 类上标注 `@Validated`，在方法入参上标注 `@Valid`。当客户端传入违规数据时（如 `text` 为空），Spring 校验框架自动拦截并抛出 `MethodArgumentNotValidException`，由全局异常处理器统一拦截返回标准化错误 JSON。
*   **`CommonResult<T>`**：统一响应体包装类。强制规范接口响应结构为 `{ code: 0, data: ..., msg: "" }`。

---

## 3. Spring Security 与 SpEL 表达式权限校验

在 Controller 的敏感写操作方法上，标注了 Spring Security 的声明式权限控制：

```java
@PreAuthorize("@ss.hasPermission('search:document:create')")
```

### 3.1 运行机制与 SpEL 表达式
*   **SpEL 表达式**：`@ss` 为注册在 Spring 容器中的权限求值 Bean (`SecurityPermissionEvaluator`) 的别名。
*   **方法鉴权机制**：在执行 `createSearchDocument` 方法前，Spring Security AOP 切面通过 SpEL 动态调用 `@ss.hasPermission('search:document:create')` 方法，校验当前登录用户的 Role/Permission 权限列表。若用户缺少该权限，直接抛出 `AccessDeniedException` 并返回 HTTP 403 Forbidden 响应。

---

## 4. 业务异常与统一错误码规范 (`ServiceException`)

业务层错误统一抛出自定义 `ServiceException`：

```java
private void validateSearchDocumentExists(String id) {
    if (id == null || !searchDocumentRepository.existsById(id)) {
        throw exception(DOCUMENT_NOT_EXISTS);
    }
}
```

*   **`ErrorCodeConstants`**：在 `yudao-module-search-api` 模块的 `enums/ErrorCodeConstants.java` 中集中声明错误码常量：
    `ErrorCode DOCUMENT_NOT_EXISTS = new ErrorCode(1_009_001_000, "文档不存在");`
*   **全局异常拦截**：系统捕获 `ServiceException` 后，自动提取错误码（`1009001000`）与提示信息，封装为 `CommonResult.error(...)` 格式返回，防止数据库底层的异常堆栈信息向前端泄露。

---

## 5. OpenAPI v3 (Knife4j) 接口文档标注规范

使用 Swagger / OpenAPI v3 注解对接口进行元数据标注，自动生成交互式接口文档：
*   **`@Tag(name = "管理后台 - 全文检索服务")`**：标注在 Controller 类上，对接口进行分组归类。
*   **`@Operation(summary = "创建/索引文档")`**：标注在接口方法上，描述接口的核心功能。
*   **`@Parameter(name = "id", description = "编号", required = true)`**：标注请求参数的含义、是否必填及示例值。

> **专项知识点导引**：
> *   [OpenAPI v3 (Swagger 3) 规范与 Knife4j 微服务聚合文档设计规范](swagger-openapi-and-knife4j.md)


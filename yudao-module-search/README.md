# MongoDB 新闻管理模块后端接口说明书

本文档提供了 MongoDB 新闻（News）管理模块的后端接口规范与数据格式定义，用于指导前端及其他客户端进行接口集成。

---

## 1. 全局约定

### 1.1 基础路径 (Base URL)
`/admin-api/mongo/news`

### 1.2 鉴权与请求头 (Headers)
* `Authorization: Bearer <AccessToken>`（OAuth2 用户访问令牌，必填）
* `tenant-id: <TenantID>`（租户标识，必填，本地开发默认值：`1`）

---

## 2. 数据结构设计与字段映射

为支持 MongoDB 的无模式（Schema-less）特征，数据传输与存储结构分为核心主字段与动态扩展属性两部分：

### 2.1 核心主字段
这些字段在后端实体类及接口中显式定义，参与基础的分页及条件检索：
* `title` (String): 新闻标题，必填。支持模糊搜索。
* `keywords` (List<String>): 新闻关键字，必填。用于按标签过滤。
* `content` (String): 新闻正文内容，必填。

### 2.2 动态扩展属性
* `extra` (Map<String, Object>): 动态字段容器，选填。
* 除上述三大主字段外，前端传入的所有额外字段（如作者、阅读数、状态等）必须统一放入 `extra` 映射中提交，后端以嵌套键值对形式存入 MongoDB 文档。

---

## 3. 接口列表

### 3.1 批量导入新闻

* **请求路径**: `POST /mongo/news/batch-import`
* **接口权限**: `mongo:news:create`
* **内容类型**: `application/json`
* **请求体示例**:
  ```json
  [
    {
      "title": "大模型在物联网领域的创新应用",
      "keywords": ["大模型", "IoT", "人工智能"],
      "content": "正文内容...",
      "extra": {
        "author": "张三",
        "views": 250,
        "status": "published",
        "importance": "high"
      }
    }
  ]
  ```
* **响应体示例**:
  ```json
  {
    "code": 0,
    "data": true,
    "msg": ""
  }
  ```

### 3.2 删除新闻

* **请求路径**: `DELETE /mongo/news/delete`
* **接口权限**: `mongo:news:delete`
* **请求参数**:
  * `id` (Query String, 必填): 待删除的新闻文档 ID
* **请求示例**: `DELETE /admin-api/mongo/news/delete?id=60c72b2f9b1d8e2a1c8f4b5a`
* **响应体示例**:
  ```json
  {
    "code": 0,
    "data": true,
    "msg": ""
  }
  ```

### 3.3 查询单篇新闻详情

* **请求路径**: `GET /mongo/news/get`
* **接口权限**: `mongo:news:query`
* **请求参数**:
  * `id` (Query String, 必填): 新闻文档 ID
* **请求示例**: `GET /admin-api/mongo/news/get?id=60c72b2f9b1d8e2a1c8f4b5a`
* **响应体示例**:
  ```json
  {
    "code": 0,
    "msg": "",
    "data": {
      "id": "60c72b2f9b1d8e2a1c8f4b5a",
      "title": "大模型在物联网领域的创新应用",
      "keywords": ["大模型", "IoT", "人工智能"],
      "content": "正文内容...",
      "createTime": "2026-07-09T10:29:19",
      "extra": {
        "author": "张三",
        "views": 250,
        "status": "published"
      }
    }
  }
  ```

### 3.4 分页查询新闻列表

* **请求路径**: `GET /mongo/news/page`
* **接口权限**: `mongo:news:query`
* **请求参数 (Query String)**:
  * `pageNo` (Integer, 必填): 当前页码（从 1 开始）
  * `pageSize` (Integer, 必填): 每页显示的条数
  * `searchType` (String, 选填): 检索范围，`all` (全文检索), `title` (标题检索), `content` (正文检索)
  * `searchKey` (String, 选填): 检索关键词
* **请求示例**: `GET /admin-api/mongo/news/page?pageNo=1&pageSize=10&searchType=all&searchKey=物联网`
* **响应体示例**:
  ```json
  {
    "code": 0,
    "msg": "",
    "data": {
      "list": [
        {
          "id": "60c72b2f9b1d8e2a1c8f4b5a",
          "title": "大模型在物联网领域的创新应用",
          "keywords": ["大模型", "IoT", "人工智能"],
          "content": "正文内容...",
          "createTime": "2026-07-09T10:29:19",
          "extra": {
            "author": "张三",
            "views": 250
          }
        }
      ],
      "total": 1
    }
  }
  ```

---

## 4. 客户端数据映射逻辑参考

在前端界面（如表单、表格等）与接口交互时，推荐的数据组装与提取逻辑如下：

### 4.1 数据提交（新增/修改）
当客户端收集到一个包含核心字段与动态扩展字段的统一对象 `formData` 时，需将其拆分为核心字段与 `extra` 对象提交给后端：

```typescript
interface ClientNewsObject {
  title: string;
  keywords: string[];
  content: string;
  [key: string]: any; // 其他动态属性，如 author, views
}

// 拆分与组装
const convertToPayload = (formData: ClientNewsObject) => {
  const { title, keywords, content, ...extra } = formData;
  return {
    title: title || '',
    keywords: keywords || [],
    content: content || '',
    extra: extra
  };
};
```

### 4.2 数据接收（详情/回显）
当客户端从后端接口获取到含有 `extra` 字段的结构化数据时，可将其合并解构为平面对象用于前端数据双向绑定：

```typescript
// 还原与合并
const convertToFormData = (backendData: any) => {
  return {
    id: backendData.id,
    title: backendData.title,
    keywords: backendData.keywords,
    content: backendData.content,
    createTime: backendData.createTime,
    ...backendData.extra // 将嵌套的动态字段平铺合并到根级别
  };
};


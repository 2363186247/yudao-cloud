### **基于 Spring Cloud 与 MongoDB 的全文检索服务**

**任务名称**：yudao-cloud 全文检索微服务开发\
**技术栈**：Spring Cloud Alibaba、Nacos、Spring Gateway、Spring Data
MongoDB、MongoDB 5.0+\
**项目框架**：yudao-cloud 微服务基础平台\
**任务周期**：预计 10个工作日

#### **1. 任务背景与目标**

当前业务系统基于 yudao-cloud
构建，已有大量业务数据如文章缺乏高效的全文检索能力。\
本任务要求独立开发一个 **搜索微服务 **yudao-module-search，利用 MongoDB
的文本索引能力，对外提供标准 RESTful
API，实现文档的索引、删除和全文搜索（含高亮、分页），并完整集成到
yudao-cloud 的服务体系中。

**目标**：

掌握 Spring Cloud 微服务实际开发全流程

掌握 MongoDB 全文索引设计与 Spring Data MongoDB 高级查询

输出可演示、可集成的搜索功能，能通过 Gateway + 认证 统一访问

#### **2. 任务阶段、内容与交付物**

##### **阶段一：技术选型与详细设计**

**内容**：

调研 MongoDB Text Index 机制（权重、语言分词限制）

设计文档存储结构（字段：title、content、tags、businessType、businessId、createTime 等）

设计 REST API 接口（索引、删除、搜索），约定 yudao
统一返回格式 CommonResult

画出搜索请求时序图（Gateway → Search 服务 → MongoDB）

**交付物**：\
《全文检索服务设计文档》（含数据模型、索引定义、API 详细说明、时序图）

##### **阶段二：模块搭建与 yudao-cloud 集成**

**内容**：

在 yudao-cloud 工程中创建 yudao-module-search 模块，引入依赖

配置 bootstrap.yml，注册到 Nacos，接入 yudao 公共组件（日志、异常、Web
安全等）

配置 MongoDB 连接信息，验证服务启动、健康检查正常

**交付物**：\
可启动的 yudao-module-search 服务，Nacos 控制台可见服务实例

##### **阶段三：数据层与全文索引实现**

**内容**：

编写实体类 SearchDocument，使用 @Document、@TextIndexed 标注

编写 SearchDocumentRepository 继承 MongoRepository，自定义 @Query 文本搜索方法

自动创建 Text Index（指定权重和语言），编写索引初始化组件

使用 Testcontainers 或内嵌 MongoDB 编写 Repository 层单测

**交付物**：\
索引初始化代码 + Repository 单元测试全绿

##### **阶段四：服务层与搜索逻辑开发**

**内容**：

实现 SearchService 接口：\
indexDocument(DocumentCreateReq)、deleteDocument(String id)、\
search(SearchPageReq) -\> PageResult\<SearchDocumentVO\>

全文搜索核心：使用 TextQuery 构建查询，按相关度 textScore 排序，处理分页

**实现高亮**：通过 MongoDB 聚合管道 \$search 或 \$meta +
自行截取（需调研），返回高亮片段

编写 Service 层单元测试（Mock Repository）

**交付物**：\
Service 核心逻辑代码 + 单测，搜索和高亮功能可验证

##### **阶段五：控制器与网关集成**

**内容**：

编写 SearchController，遵循 yudao-cloud RESTful 规范，返回 CommonResult

对接 Spring Cloud Gateway，配置搜索服务路由，确保认证 Token 正常传递

集成 Swagger/Knife4j，在 yudao 聚合文档中暴露搜索接口

编写集成测试（MockMvc 模拟 HTTP 请求）

**交付物**：\
可调用的搜索 API 接口文档页面，集成测试通过

##### **阶段六：功能验证与效果调优**

**内容**：

编写批量导入脚本，向服务灌入 500+ 条测试文档（中文为主）

使用 Postman 验证多关键词搜索、高亮展示、权重排序、分页

记录测试结果，分析中文分词局限性，尝试通过调整索引选项或补充词典优化

**交付物**：\
《测试报告》（含测试用例、响应截图、性能数据及分词局限性说明）

##### **阶段七：文档与汇报准备**

**内容**：

整理接口文档与部署说明

总结开发过程中遇到的问题及解决办法

准备汇报材料：架构图、搜索效果 Demo 录屏或截图

**交付物**：\
《开发总结与汇报》PPT 或文档，归档到项目知识库

#### **3. 工作量体现（汇报重点）**

**代码量**：新增完整的微服务模块，预计核心代码 + 测试 \> 1500 行

**完整闭环**：从需求设计 → 模块搭建 → 数据库索引 → 业务编码 → 测试 →
上线文档，由实习生独立完成

**技术深度**：掌握了 MongoDB 全文索引与高亮技术、Spring Data
高级查询、微服务集成与网关鉴权

**文档输出**：1 份设计文档、1 份测试报告、1 份开发总结、接口自动文档

**可演示成果**：浏览器直接访问 Gateway
搜索接口，输入关键字即刻返回带高亮的搜索结果

#### **4. 考核标准**

  ------------------------------------------------------------------------
  考核项         权重     说明
  -------------- -------- ------------------------------------------------
  设计文档质量   20%      索引设计合理、API 定义清晰

  功能完整度     30%      增删索引、全文搜索、高亮、分页全部可用

  代码规范       20%      符合 yudao-cloud 编码规范、日志与异常处理得当

  测试覆盖       15%      单元测试与集成测试通过，报告详实

  文档与总结     15%      汇报材料逻辑清晰，能体现学习过程和思考
  ------------------------------------------------------------------------

#### **5. 风险与应对**

**MongoDB 中文分词不理想**：社区版默认按空格分词，中文需使用 ICU
分词（需 MongoDB 4.0+ 配置 default_language:
\'none\' 配合自定义分词）或接受现状，在汇报中客观说明优劣。如时间允许，调研
MongoDB Atlas Search 作为扩展话题。

**数据实时同步**：本期不要求对接业务变更消息，暂通过 API
手动索引数据，未来可扩展监听 Canal/消息队列。
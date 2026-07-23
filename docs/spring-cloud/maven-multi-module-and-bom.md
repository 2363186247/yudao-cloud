[← 返回主技术说明文档](../全文检索服务构建与学习文档.md)

# Maven 多模块工程划分与 BOM 依赖版本管控规范

本文档阐述微服务系统中 Maven 多模块架构（Multi-Module Project）划分原则及 BOM（Bill of Materials）依赖版本管控规范。

---

## 1. 核心概念规范

### 1.1 Maven 多模块项目 (Multi-Module Project)
在大型微服务架构中，为了实现代码复用、职责分离与独立构建，将工程拆分为若干独立子 Module。父工程通过 `pom.xml` 统一管理公共属性与构建插件，子模块实现具体业务与服务发布。

### 1.2 BOM (Bill of Materials) 依赖版本词典
在分布式系统中，不同子模块引入第三方库版本不一致极易触发 `NoSuchMethodError` 或 `ClassNotFoundException`。BOM 模式通过在全局独立的 POM 中定义统一的版本号矩阵，所有子模块继承该 BOM 即可实现全网依赖版本大一统。

---

## 2. 四层 POM 架构设计解析

项目中四个层级的 `pom.xml` 文件分工如下：

### 2.1 根目录聚合 POM ([pom.xml](../../pom.xml))
*   **定位**：微服务全量工程聚合器与顶层依赖管控点。
*   **核心配置**：
    1.  `<packaging>pom</packaging>`：声明为 POM 管理容器。
    2.  `<modules>`：聚合所有顶层子模块（如 `yudao-dependencies`、`yudao-gateway`、`yudao-module-search`）。
    3.  `<dependencyManagement>`：通过 `scope=import` 导入 `yudao-dependencies` BOM，建立全局版本继承基线。

### 2.2 版本管控 BOM POM ([yudao-dependencies/pom.xml](../../yudao-dependencies/pom.xml))
*   **定位**：整个微服务集群的依赖版本词典。
*   **核心配置**：
    1.  `<properties>`：锁定三大核心框架版本配对（Spring Boot 2.7.18、Spring Cloud 2021.0.9、Spring Cloud Alibaba 2021.0.6.2）。
    2.  `<dependencyManagement>`：预先定义项目中所有公共组件（MyBatis-Plus、Redis、MongoDB、Hutool）的具体版本号。

### 2.3 业务聚合 POM ([yudao-module-search/pom.xml](../../yudao-module-search/pom.xml))
*   **定位**：检索业务模块父 POM。
*   **核心配置**：
    1.  `<parent>` 继承最外层 `yudao` 根工程。
    2.  `<modules>` 聚合业务子模块：`yudao-module-search-api`（RPC/Feign 接口定义）与 `yudao-module-search-server`（核心业务服务）。

### 2.4 检索微服务核心 POM ([yudao-module-search-server/pom.xml](../../yudao-module-search/yudao-module-search-server/pom.xml))
*   **定位**：最终打包生成可执行 Jar 包并对外提供 HTTP/RPC 服务的服务节点 POM。
*   **核心配置**：
    1.  `<packaging>jar</packaging>`：声明产物类型。
    2.  `<dependencies>`：声明该微服务所需依赖（如 `spring-cloud-starter-alibaba-nacos-discovery`、`spring-boot-starter-data-mongodb`、`jieba-analysis`）。所有通用依赖**不标注 `<version>` 标签**，全量由 BOM 自动继承。

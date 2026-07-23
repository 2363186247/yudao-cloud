[← 返回主技术说明文档](../全文检索服务构建与学习文档.md)

# Spring Bean 体系、IoC 控制反转与 DI 依赖注入规范

本文档阐述 Spring 框架中核心组件管理模型 —— Spring Bean、控制反转 (IoC) 与依赖注入 (DI) 的技术实现与工程优势。

---

## 1. Spring Bean 模型概念

### 1.1 JVM 普通对象 vs Spring Bean
*   **JVM 普通对象**：通过 `new` 关键字在堆内存中手动的实例化对象，生命周期与依赖关系由调用方直接管理。
*   **Spring Bean**：由 Spring IoC 容器（ApplicationContext）统一完成实例化、属性装配、初始化及销毁全生命周期管理的 Java 对象。

---

## 2. IoC 控制反转与 DI 依赖注入

### 2.1 控制反转 (Inversion of Control - IoC)
*   **概念**：将对象的创建、依赖关系维护与生命周期管理权限，由传统的应用程序手动控制，转交由 Spring 容器统一管理。
*   **实现方式**：在类定义上标注 `@Component`、`@Service`、`@Repository`、`@RestController`，声明该类交由容器管理。

### 2.2 依赖注入 (Dependency Injection - DI)
*   **概念**：IoC 控制反转的具体工程实现。在应用运行期，Spring 容器通过反射机制自动将目标依赖对象注入到需要使用该依赖的组件中。
*   **注入方式**：使用 `@Resource`（按名称注入）或 `@Autowired`（按类型注入）标注成员变量或构造函数。

---

## 3. 单例作用域 (Singleton Scope) 与工程优势

默认情况下，Spring 容器管理的 Bean 处于**单例作用域（Singleton）**。

1.  **内存开销与 GC 优化**：整个 JVM 运行期内，每个 Bean 组件（如 `TranslationServiceImpl`）在内存中仅存在唯一的实例。高并发请求共享同一个 Bean 处理逻辑，避免频繁 `new` 对象引发的堆内存抖动与频发 GC 停顿。
2.  **解耦与面向接口编程**：业务层依赖于 Service 接口而非具体实现类。更换具体实现时仅需修改配置或注解，无需改动调用方代码。
3.  **声明式切面 (AOP) 集成**：受容器管理的 Bean 可无缝集成事务管理（`@Transactional`）、请求校验（`@Validated`）及日志链路追踪。

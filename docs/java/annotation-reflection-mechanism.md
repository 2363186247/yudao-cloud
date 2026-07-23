[← 返回主技术说明文档](../全文检索服务构建与学习文档.md)

# Java / Spring 注解 (Annotation)、反射与代理机制规范

本文档阐述 Java 注解（Annotation）的技术定义、运行期反射处理流程，以及 Lombok 工具库在工程中的应用规范。

---

## 1. 注解 (Annotation) 的技术定义与生命周期

注解是添加到 Java 代码元素（类、方法、属性、参数）上的**元数据标记（Metadata）**。注解本身不包含业务执行逻辑，需配合反射机制或字节码增强技术生效。

### 1.1 生命周期 (RetentionPolicy)
*   **`SOURCE`**：仅保留在源码中，编译为 `.class` 文件时被丢弃（如 Lombok 的 `@Data`）。
*   **`CLASS`**：保留在 `.class` 字节码中，但 JVM 加载时不装载（默认行为）。
*   **`RUNTIME`**：保留在字节码中，并在 JVM 运行期持续保留（如 `@SpringBootApplication`、`@Component`），可通过反射 API 获取。

---

## 2. 注解的底层运行机制

1.  **Retention 标记**：确保注解在运行期（RUNTIME）通过 Class 字节码进入 JVM 内存。
2.  **反射机制（Reflection）**：Spring 容器在启动扫描阶段，通过反射 API（`Class.getAnnotations()`、`Field.getAnnotation()`）读取类和字段上的注解元数据。
3.  **控制反转 (IoC)**：扫描到 `@Component`、`@Service`、`@RestController` 的类后，Spring 通过反射调用无参构造函数实例化 Bean 并注入容器。
4.  **动态代理 (AOP)**：对于标注了 `@Transactional` 或 `@Validated` 的方法，Spring 采用 JDK 动态代理或 CGLIB 生成子类代理对象，在目标方法执行前后织入增强逻辑。

---

## 3. 工程核心注解规范

### 3.1 复合注解 `@SpringBootApplication`
`@SpringBootApplication` 为组合注解，集成以下三个核心注解功能：
*   **`@SpringBootConfiguration`**：继承自 `@Configuration`，声明当前类为配置类。
*   **`@EnableAutoConfiguration`**：开启 Spring Boot 自动配置机制，依据 classpath 下的 jar 包依赖动态装配默认 Bean（如自动配置 `MongoTemplate` 和 Nacos 注册客户端）。
*   **`@ComponentScan`**：组件扫描器，默认以当前类所在包为起点递归扫描注入 Bean。

### 3.2 Lombok 注解与链式调用 (`@Accessors`)
*   **`@Data`**：编译期自动生成 Getter、Setter、`equals`、`hashCode` 与 `toString` 方法。
*   **`@Accessors(chain = true)`（链式调用）**：
    *   *机制*：默认生成的 Setter 方法返回类型为 `void`。开启 `chain = true` 后，Lombok 将 Setter 方法的返回值修改为对象引用本身（`return this`）。
    *   *作用*：支持链式赋值写法（`new User().setName("a").setAge(18)`），提升代码简洁度。在 Gateway 网关过滤器属性绑定中属于必选项。

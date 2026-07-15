# ==============================================================================
# yudao-cloud 一键本地开发启动脚本 (支持微服务架构)
# ==============================================================================
#
# [TIPS] 数据库初始化说明 (仅需在首次启动、或重置 Docker 数据卷时执行一次，日常启动无需执行):
#
#    在 PowerShell 中执行以下命令，将基础 SQL 导入到正在运行的 Docker MySQL 中：
#    Get-Content sql/mysql/ruoyi-vue-pro.sql | docker exec -i yudao-mysql mysql -uroot -p123456 ruoyi-vue-pro
#    Get-Content sql/mysql/quartz.sql | docker exec -i yudao-mysql mysql -uroot -p123456 ruoyi-vue-pro
#    Get-Content sql/mysql/mongo_news_menu.sql | docker exec -i yudao-mysql mysql -uroot -p123456 ruoyi-vue-pro
#
# [TIPS] 手动分步开发启动命令 (在终端手动执行):
#
# 1. 启动 Docker 基础设施 (MySQL, Redis, Nacos, MongoDB):
#    cd script/docker
#    docker compose -f docker-compose-infra.yml up -d
#
# 2. 编译并安装依赖模块 (在项目根目录下执行):
#    mvn clean install -Dmaven.test.skip=true -Dspring-boot.repackage.skip=true
#
# 3. 启动各个微服务组件:
#    - Core 后端: cd yudao-server && mvn spring-boot:run
#    - Gateway 网关: cd yudao-gateway && mvn spring-boot:run
#    - Search 检索服务: cd yudao-module-search/yudao-module-search-server && mvn spring-boot:run
#
# 4. 启动 Vue3 前端服务 (在前端目录下执行):
#    cd yudao-ui/yudao-ui-admin-vue3 && pnpm run dev
#
# ==============================================================================

import subprocess
import os
import sys
import time

# 兼容 Windows 控制台的 UTF-8 编码，防止特殊字符导致崩溃
try:
    sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass

# 获取项目根目录 (即当前脚本所在路径)
project_root = os.path.dirname(os.path.abspath(__file__))
frontend_dir = os.path.join(project_root, "yudao-ui", "yudao-ui-admin-vue3")

def launch_services():
    print("==================================================")
    print("        yudao-cloud 微服务集群一键启动程序        ")
    print("==================================================")
    
    # 1. 编译构建整个项目
    print("\n[1/5] 正在构建项目依赖 (mvn clean install)...")
    print("      提示：这需要 1 ~ 2 分钟，构建输出将直接显示在控制台...")
    
    # 运行同步构建，直接输出到终端
    res = subprocess.run(
        "mvn clean install -Dmaven.test.skip=true -Dspring-boot.repackage.skip=true",
        cwd=project_root,
        shell=True
    )
    if res.returncode != 0:
        print("\n[ERROR] 项目构建失败！请检查上述 Maven 错误。")
        sys.exit(1)
        
    print("\n[✔] 项目构建成功！开始启动各微服务及前端组件...")

    # 日志文件路径
    frontend_log_path = os.path.join(project_root, "frontend.log")
    backend_log_path = os.path.join(project_root, "backend.log")
    gateway_log_path = os.path.join(project_root, "gateway.log")
    search_log_path = os.path.join(project_root, "search.log")

    creation_flags = 0

    # 2. 启动 Vue3 前端
    print("\n[2/5] 正在后台启动 Vue3 前端服务...")
    print(f"      -> 日志输出: {frontend_log_path}")
    frontend_log = open(frontend_log_path, "w", encoding="utf-8")
    frontend_proc = subprocess.Popen(
        ["pnpm", "run", "dev"],
        cwd=frontend_dir,
        stdout=frontend_log,
        stderr=subprocess.STDOUT,
        shell=True,
        creationflags=creation_flags
    )

    # 3. 启动 Core 后端 (yudao-server)
    print("\n[3/5] 正在后台启动 Core 后端服务 (yudao-server)...")
    print(f"      -> 日志输出: {backend_log_path}")
    backend_log = open(backend_log_path, "w", encoding="utf-8")
    backend_proc = subprocess.Popen(
        ["mvn", "spring-boot:run"],
        cwd=os.path.join(project_root, "yudao-server"),
        stdout=backend_log,
        stderr=subprocess.STDOUT,
        shell=True,
        creationflags=creation_flags
    )

    # 4. 启动 Gateway 网关 (yudao-gateway)
    print("\n[4/5] 正在后台启动 Gateway 网关服务 (yudao-gateway)...")
    print(f"      -> 日志输出: {gateway_log_path}")
    gateway_log = open(gateway_log_path, "w", encoding="utf-8")
    gateway_proc = subprocess.Popen(
        ["mvn", "spring-boot:run"],
        cwd=os.path.join(project_root, "yudao-gateway"),
        stdout=gateway_log,
        stderr=subprocess.STDOUT,
        shell=True,
        creationflags=creation_flags
    )

    # 5. 启动 Search 检索服务 (yudao-module-search-server)
    print("\n[5/5] 正在后台启动 Search 检索服务 (yudao-module-search-server)...")
    print(f"      -> 日志输出: {search_log_path}")
    search_log = open(search_log_path, "w", encoding="utf-8")
    search_proc = subprocess.Popen(
        ["mvn", "spring-boot:run"],
        cwd=os.path.join(project_root, "yudao-module-search", "yudao-module-search-server"),
        stdout=search_log,
        stderr=subprocess.STDOUT,
        shell=True,
        creationflags=creation_flags
    )

    print("\n==================================================")
    print("成功！所有微服务及前端组件已在后台拉起！")
    print("   Java 后端各服务初始化需要约 30 ~ 60 秒，请耐心等待。")
    print("   您可以随时使用以下命令查看实时日志：")
    print("   - 查看前端日志: Get-Content -Wait frontend.log")
    print("   - 查看 Core 日志: Get-Content -Wait backend.log")
    print("   - 查看网关日志: Get-Content -Wait gateway.log")
    print("   - 查看检索日志: Get-Content -Wait search.log")
    print("==================================================")

    # 稍微等待并检查进程是否意外退出
    time.sleep(3)
    if frontend_proc.poll() is not None:
        print("[WARN] 警告：前端服务在启动瞬间异常退出，请检查 frontend.log 了解详情。")
    if backend_proc.poll() is not None:
        print("[WARN] 警告：Core 后端服务启动瞬间异常退出，请检查 backend.log 了解详情。")
    if gateway_proc.poll() is not None:
        print("[WARN] 警告：Gateway 网关服务启动瞬间异常退出，请检查 gateway.log 了解详情。")
    if search_proc.poll() is not None:
        print("[WARN] 警告：Search 检索服务启动瞬间异常退出，请检查 search.log 了解详情。")

if __name__ == "__main__":
    launch_services()

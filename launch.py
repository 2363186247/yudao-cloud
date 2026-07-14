# ==============================================================================
# yudao-cloud 一键本地开发启动脚本
# ==============================================================================
#
# [TIPS] 数据库初始化说明 (仅需在首次启动、或重置 Docker 数据卷时执行一次，日常启动无需执行):
#
#    在 PowerShell 中执行以下命令，将基础 SQL 导入到正在运行 of Docker MySQL 中：
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
#    mvn clean install -pl yudao-server -am -Dmaven.test.skip=true
#
# 3. 启动 Java 后端服务 (在 yudao-server 目录下执行):
#    cd yudao-server
#    mvn spring-boot:run
#
# 4. 启动 Vue3 前端服务 (在前端目录下执行):
#    cd yudao-ui/yudao-ui-admin-vue3
#    pnpm run dev
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
backend_module_dir = os.path.join(project_root, "yudao-server")

backend_log_path = os.path.join(project_root, "backend.log")
frontend_log_path = os.path.join(project_root, "frontend.log")

def launch_services():
    print("==================================================")
    print("          yudao-cloud 开发环境启动程序             ")
    print("==================================================")
    
    # 1. 启动 Frontend 开发服务器 (并行启动)
    print("\n[1/2] 正在后台启动 Vue3 前端服务...")
    print(f"      -> 前端运行日志将实时写入: {frontend_log_path}")
    
    frontend_log = open(frontend_log_path, "w", encoding="utf-8")
    # Windows 下不使用 DETACHED_PROCESS 标志，因为可能导致静默退出
    creation_flags = 0

    frontend_proc = subprocess.Popen(
        ["pnpm", "run", "dev"],
        cwd=frontend_dir,
        stdout=frontend_log,
        stderr=subprocess.STDOUT,
        shell=True,
        creationflags=creation_flags
    )
    
    # 2. 启动 Java 后端 (分步：先构建依赖，再在子模块启动)
    print("\n[2/2] 正在后台启动 Java 后端服务...")
    print(f"      -> 后端运行日志将实时写入: {backend_log_path}")
    
    backend_log = open(backend_log_path, "w", encoding="utf-8")
    
    # 我们在新开的线程/进程中执行构建和启动，以防阻塞当前脚本退出
    # 编写一个小的批处理命令，先构建再启动
    run_cmd = (
        "echo === [STEP 1] Building dependencies... === && "
        "mvn clean install \"-Dmaven.test.skip=true\" \"-Dspring-boot.repackage.skip=true\" && "
        "echo === [STEP 2] Starting spring-boot application... === && "
        "cd yudao-server && "
        "mvn spring-boot:run"
    )
    
    backend_proc = subprocess.Popen(
        run_cmd,
        cwd=project_root,
        stdout=backend_log,
        stderr=subprocess.STDOUT,
        shell=True,
        creationflags=creation_flags
    )
    
    print("\n==================================================")
    print("成功！两个服务已成功在后台拉起！")
    print("   Java 后端将首先自动构建依赖，这需要 1 ~ 2 分钟，请耐心等待。")
    print("   您可以随时使用以下命令查看日志：")
    print("   - 查看后端日志: Get-Content -Wait backend.log")
    print("   - 查看前端日志: Get-Content -Wait frontend.log")
    print("==================================================")
    
    # 稍微等待并检查进程是否意外退出
    time.sleep(3)
    if frontend_proc.poll() is not None:
        print("[WARN] 警告：前端服务在启动瞬间异常退出，请检查 frontend.log 了解详情。")
    if backend_proc.poll() is not None:
        print("[WARN] 警告：后端构建命令在启动瞬间异常退出，请检查 backend.log 了解详情。")

if __name__ == "__main__":
    launch_services()

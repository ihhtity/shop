#!/usr/bin/env python
# 指定Python解释器路径
import os
# 导入操作系统模块
import sys
# 导入系统模块
import time
# 导入时间模块
# 导入pymysql模块
import pymysql
# 导入命令行执行函数
import django

# 创建MySQL数据库
def create_mysql_database():
    # 导入Django设置模块
    from config.settings import DATABASES
    
    # 获取默认配置
    db_config = DATABASES['default']
    # 提取数据库配置
    db_name = db_config['NAME']
    # 提取数据库配置
    user = db_config['USER']
    # 提取数据库配置
    password = db_config['PASSWORD']
    # 提取数据库配置
    host = db_config['HOST']
    # 提取数据库配置
    port = int(db_config['PORT'])

    # 提取数据库配置
    try:
        # 连接数据库
        conn = pymysql.connect(
            host=host,
            port=port,
            user=user,
            password=password,
            charset='utf8mb4'
        )
        # 创建游标
        cursor = conn.cursor()
        # 执行创建数据库语句
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS `{db_name}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci")
        # 提交事务
        conn.commit()
        # 关闭游标
        cursor.close()
        # 关闭连接
        conn.close()
        print(f'[INFO] 数据库 `{db_name}` 创建成功！')
    except Exception as e:
        print(f'[ERROR] 创建数据库失败: {e}')
        raise

# 执行数据库迁移
def run_migrations():
    # 定义锁文件路径
    lock_path = os.path.join(os.path.dirname(__file__), '.migrate.lock')
    # 检查锁文件是否存在
    if os.path.exists(lock_path):
        return
    # 尝试创建锁文件
    try:
        # 创建锁文件
        lock_file = open(lock_path, 'w')
        # 写入当前时间戳
        lock_file.write(str(time.time()))
        # 刷新缓冲区
        lock_file.flush()
        # 关闭文件
        lock_file.close()
    except:
        return
    
    try:
        # 导入Django管理命令模块
        from django.core.management import call_command
        # 导入Django设置模块
        from config.settings import DATABASES
        
        # 提取数据库引擎
        engine = DATABASES['default']['ENGINE']
        
        print('=' * 60)
        # 判断数据库引擎是否为MySQL
        if 'mysql' in engine:
            # 创建MySQL数据库
            create_mysql_database()
            print('[INFO] 使用MySQL数据库')
        else:
            print('[INFO] 使用SQLite3数据库')
        
        print('\n[STEP 1] 生成迁移文件...')
        # 生成迁移文件
        call_command('makemigrations', verbosity=2)
        
        print('\n[STEP 2] 执行数据库迁移...')
        # 执行数据库迁移
        call_command('migrate', verbosity=2)
        
        print('\n[INFO] 数据库迁移完成！')
        print('=' * 60)
    finally:
        try:
            # 尝试删除锁文件
            os.unlink(lock_path)
        except:
            pass

# 主函数
def main():
    # 定义主函数
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
    # 设置默认Django设置模块
    
    try:
        # 尝试导入Django
        from django.core.management import execute_from_command_line
        # 导入Django模块
        django.setup()
        # 初始化Django
        
        if len(sys.argv) > 1 and sys.argv[1] == 'runserver' and os.environ.get('RUN_MAIN') != 'true':
            # 判断是否为启动服务器命令且非主进程
            run_migrations()
            # 执行迁移
            
    except ImportError as exc:
        # 捕获导入异常
        raise ImportError(
            # 抛出导入错误
            "Couldn't import Django. Are you sure it's installed and "
            # 错误信息第一部分
            "available on your PYTHONPATH environment variable? Did you "
            # 错误信息第二部分
            "forget to activate a virtual environment?"
            # 错误信息第三部分
        ) from exc
        # 保留原始异常
        
    execute_from_command_line(sys.argv)
    # 执行Django命令行

if __name__ == '__main__':
    # 判断是否为主模块
    main()
    # 调用主函数

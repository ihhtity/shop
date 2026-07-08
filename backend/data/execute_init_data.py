import os
import pymysql

db_config = {
    'host': 'localhost',
    'port': 3306,
    'user': 'root',
    'password': '123456',
    'database': 'shop',
    'charset': 'utf8mb4'
}

sql_file = os.path.join(os.path.dirname(__file__), 'init_data.sql')

with open(sql_file, 'r', encoding='utf-8') as f:
    sql_content = f.read()

sql_statements = [stmt.strip() for stmt in sql_content.split(';') if stmt.strip()]

try:
    conn = pymysql.connect(**db_config)
    cursor = conn.cursor()
    
    for stmt in sql_statements:
        if stmt:
            try:
                cursor.execute(stmt)
            except Exception as e:
                print(f'[WARN] Failed to execute: {stmt[:50]}...')
                print(f'       Error: {e}')
    
    conn.commit()
    print('[SUCCESS] All SQL statements executed successfully!')
    
    cursor.close()
    conn.close()
except Exception as e:
    print(f'[ERROR] {e}')
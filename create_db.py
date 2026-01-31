import pymysql

try:
    connection = pymysql.connect(
        host='127.0.0.1',
        user='root',
        password=''
    )
    cursor = connection.cursor()
    cursor.execute("CREATE DATABASE IF NOT EXISTS webteam_db")
    print("Database 'webteam_db' created or already exists.")
    connection.close()
except Exception as e:
    print(f"Failed to create database: {e}")

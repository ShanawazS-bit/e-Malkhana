import pymysql

try:
    connection = pymysql.connect(
        host='127.0.0.1',
        user='root',
        password='',
        database='webteam_db'
    )
    cursor = connection.cursor()
    cursor.execute("SELECT username, email FROM auth_user ORDER BY date_joined DESC LIMIT 5")
    rows = cursor.fetchall()
    print("Recent Users in DB:")
    for row in rows:
        print(row)
    connection.close()
except Exception as e:
    print(f"Failed to query database: {e}")

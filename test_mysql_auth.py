import pymysql

passwords = ['', 'root', 'password', 'admin']
success = False

for pwd in passwords:
    try:
        print(f"Trying user='root', password='{pwd}'...")
        connection = pymysql.connect(
            host='127.0.0.1',
            user='root',
            password=pwd,
            connect_timeout=2
        )
        print(f"SUCCESS! Connected with password: '{pwd}'")
        connection.close()
        success = True
        break
    except Exception as e:
        print(f"Failed with '{pwd}': {e}")

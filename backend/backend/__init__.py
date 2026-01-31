import pymysql

pymysql.install_as_MySQLdb()

# Hack to trick Django into thinking we have a newer version of mysqlclient
import MySQLdb
MySQLdb.version_info = (2, 2, 7, "final", 0)
MySQLdb.__version__ = "2.2.7"

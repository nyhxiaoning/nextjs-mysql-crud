import mysql from "serverless-mysql";

export const pool = mysql({
  config: {
    host: "localhost",
    user: "henry",
    password: "nyh123",
    port: 3306,
    database: "my_next_db",
    // 
    // 增加一个数据库的初始化table表的实现
  },
});

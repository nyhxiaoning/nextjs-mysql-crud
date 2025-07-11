import mysql from "serverless-mysql";
// host: "localhost",
// user: "henry",
// password: "nyh123",
// port: 3306,
// database: "my_next_db",
export const pool = mysql({
  config: {
    host: "rm-0xiocabt0k05fu77p.mysql.rds-aliyun-america.rds.aliyuncs.com", // 改为远程地址
    user: "nodejs", // 改为远程数据库账号
    password: "Ec^jL33KBq6a", // 改为远程数据库密码
    // insecureAuth: true, // 允许旧版验证方式
    // waitForConnections: true,
    port: 3306, // MySQL 默认端口
    database: "jeejio_next_db", // 数据库名称
    // 增加一个数据库的初始化table表的实现
  },
});

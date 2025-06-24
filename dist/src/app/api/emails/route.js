// export const runtime = "edge";

import { pool } from "src/config/db";
import { NextResponse } from "next/server";

// 所有数据 http://localhost:3000/emails
/**
 *
 * @returns 获取当前的所有的email的信息
 */
export async function GET(request, { params }) {
  console.log("调用search函数了吗-email");
  // 解析完整 URL 获取查询参数
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email"); // 获取 name 参数
  console.log(email, "email");
  try {
    const result = await pool.query("SELECT * FROM email WHERE email = ?", [
      email,
    ]);
    console.log(result, "result");
    if (result.length === 0) {
      return NextResponse.json({});
    }
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

/**
 * 查询某个email的信息
 * @param {*} request
 * @param {*} params
 * @returns
 *
 */
// export async function Search(address) {
//   try {
//     const results = await pool.query("SELECT * FROM email");
//     console.log(results, "Search-all");
//     return NextResponse.json(results);
//   } catch (error) {
//     return NextResponse.json(
//       { message: error.message },
//       {
//         status: 500,
//       }
//     );
//   }
// }

/**
 * 新建当前的email的信息
 * @param {*} request
 * @returns
 */
export async function POST(request) {
  try {
    console.log(request, "request");
    const data = await request.json();
    console.log(data, "data");
    // ✅ 1. 确保 email 表存在，如果不存在就创建
    await pool.query(`
          CREATE TABLE IF NOT EXISTS email (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            orders VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        `);
    // return
    // 单行一条插入实现
    // const result = await pool.query("INSERT INTO email SET ?", {
    //   email,
    //   orders,
    // });
    // 删除表中的所有数据
    await pool.query("DELETE FROM email");
    // 如果需要插入多行数据，可以使用以下方式
    const placeholders = [];
    const values = [];

    data.forEach((item) => {
      const email = item["email address"];
      const orders = item["tracking number"];
      console.log(item, item["tracking number"], item["email address"]);
      // console.log('email, orders', email, orders);
      placeholders.push("(?, ?)");
      values.push(email, orders);
    });

    const sql = `INSERT INTO email (email, orders) VALUES ${placeholders.join(
      ", "
    )}`;
    const result = await pool.query(sql, values);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
}

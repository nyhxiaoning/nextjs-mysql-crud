// export const runtime = "edge";

import { pool } from "src/config/db";
import { NextResponse } from "next/server";

/**
 *
 * @returns 获取当前的所有的product的信息
 */
export async function GET(params) {
  console.log("GET", "会走这里吗", params);
  try {
    const results = await pool.query("SELECT * FROM product");
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
}

/**
 * 创建一个product的信息到数据库
 * @param {*} request
 * @returns
 */
export async function POST(request) {
  try {
    const { name, description, price } = await request.json();
    console.log(name, description, price);

    const result = await pool.query("INSERT INTO product SET ?", {
      name,
      description,
      price,
    });

    return NextResponse.json({ name, description, price, id: result.insertId });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
}

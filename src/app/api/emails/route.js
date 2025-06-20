import { pool } from "src/config/db";
import { NextResponse } from "next/server";

// 所有数据 http://localhost:3000/emails
/**
 * 
 * @returns 获取当前的所有的email的信息
 */
export async function GET() {
  try {
    const results = await pool.query("SELECT * FROM email");
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
 * 查询某个email的信息
 * @param {*} request
 * @param {*} params
 * @returns
 * 
 */
export async function Search(address) {
  try {
    const results = await pool.query("SELECT * FROM email");
    console.log(results, "Search-all");
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
 * 新建当前的email的信息
 * @param {*} request 
 * @returns 
 */
export async function POST(request) {
  try {
    const { name, description, price } = await request.json();
    console.log(name, description, price);

    const result = await pool.query("INSERT INTO email SET ?", {
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

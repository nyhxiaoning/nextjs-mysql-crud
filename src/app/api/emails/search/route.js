import { NextResponse } from "next/server";
import { pool } from "src/config/db";

// api接口：http://localhost:3000/email/search?name=
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

export async function DELETE(request, { params }) {
  try {
    await pool.query("DELETE FROM email WHERE id = ?", [params.id]);
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

export async function PUT(request, { params }) {
  const data = await request.json();

  try {
    await pool.query("UPDATE email SET ? WHERE id = ?", [data, params.id]);
    return NextResponse.json({
      ...data,
      id: params.id,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

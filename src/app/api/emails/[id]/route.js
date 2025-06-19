import { NextResponse } from "next/server";
import { pool } from "src/config/db";

export async function GET(request, { params }) {
  try {
    const result = await pool.query("SELECT * FROM email WHERE id = ?", [
      params.id,
    ]);
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

/**
 * 创建或修改当前的一个emails的信息
 * @param {*} request 
 * @param {*} param1 
 * @returns 
 */
export async function PUT(request, { params }) {
  const data = await request.json();

  try {
    await pool.query("UPDATE emails SET ? WHERE id = ?", [data, params.id]);
    return NextResponse.json({
      ...data,
      id: params.id,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

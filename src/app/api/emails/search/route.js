// export const runtime = "edge";

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
    const allresult = await pool.query(
      "SELECT * FROM allemail WHERE email = ?",
      [email]
    );
    const objallresult = JSON.parse(JSON.stringify(allresult));
    console.log(objallresult, "objallresult");
    
    const result = await pool.query("SELECT * FROM email WHERE email = ?", [
      email
    ]);
    const objresult = JSON.parse(JSON.stringify(result));
    console.log(objresult, "objresult");

    // let combinedResult = [...objallresult, ...objresult];
    // 如果查到订单
    if (objresult[0]?.orders) {
      console.log(objresult[0]?.orders, "objresult[0]?.orders");
      return NextResponse.json(result[0]);
    }else if (!objresult[0]?.orders && objallresult[0]?.orders==="") {
      console.log(objallresult[0]?.orders, "objallresult[0]?.orders");
      console.log(objresult[0]?.orders, "objresult[0]?.orders");
      // 如果查到了邮箱，但是订单空，那么返回0
      return NextResponse.json({
        orders: 0,
      });
    }else{
      // 没有查到邮箱，-1
      return NextResponse.json({
        orders: -1,
      })
    }
  } catch (error) {
    console.log(error, "error");
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

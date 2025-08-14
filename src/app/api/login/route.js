// src/app/api/login/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
      const { confirmCode } = await request.json();
  // 这里可以添加验证逻辑，例如检查用户名和密码是否匹配
  if (confirmCode !== "jeejio2025" ) {
    return NextResponse.json({ message: "用户确认码错误" }, { status: 401 });
  }
  const res = NextResponse.json({ message: "管理员登录成功" });
  // 设置本地 Cookie，模拟已登录
  res.cookies.set("user_session", "logged_in", { path: "/", httpOnly: false });
  return res;
}

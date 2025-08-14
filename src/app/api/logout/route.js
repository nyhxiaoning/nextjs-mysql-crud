// src/app/api/logout/route.js
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "已退出" });
  res.cookies.set("user_session", "", { path: "/", maxAge: 0 });
  return res;
}

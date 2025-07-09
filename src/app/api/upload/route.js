// export const runtime = "edge";

import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";
// export const runtime = 'nodejs'; // 必须是 nodejs 运行时

// export const bodyParser = false; // 直接导出 bodyParser 配置，配置nodejs的bodyparser

export const runtime = 'nodejs';
export const maxDuration = 50; // 请求最大时长（秒）
export const dynamic = 'force-dynamic'; // 禁用缓存
// export const config = {
//   api: {
//     bodyParser: false, // 禁用默认的 bodyParser
//   },
// };

export async function POST(req) {
  const uploadDir = path.join(process.cwd(), "/tmp");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = new IncomingForm({
    uploadDir,
    keepExtensions: true,
  });

  const result = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });

  console.log("上传文件对象:", result.files);

  return Response.json({
    message: "上传成功",
    files: result.files,
  });
}

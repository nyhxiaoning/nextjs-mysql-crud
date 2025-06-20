import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // 禁用默认的 bodyParser
  },
};

export async function POST(req: Request) {
  const uploadDir = path.join(process.cwd(), "/tmp");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = new IncomingForm({
    uploadDir,
    keepExtensions: true,
  });

  const result = await new Promise<any>((resolve, reject) => {
    form.parse(req as any, (err, fields, files) => {
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

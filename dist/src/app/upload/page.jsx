"use client";
import { useState } from "react";

export default function UploadForm() {
  const [fileInfo, setFileInfo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", e.target.file.files[0]);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setFileInfo(data.files);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="file" />
      <button type="submit">上传</button>
      {fileInfo && <pre>{JSON.stringify(fileInfo, null, 2)}</pre>}
    </form>
  );
}

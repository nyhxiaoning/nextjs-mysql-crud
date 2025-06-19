import { ProductForm } from "@/components/ProductForm";
import { BASE_URL } from "../../../config"; // 路径根据实际情况调整

// 组件直接用 async
export default async function NewPage() {
  const res = await fetch(`${BASE_URL}/api/products`, { cache: "no-store" });
  const products = await res.json();

  return (
    <div className="h-5/6 grid place-items-center">
      <ProductForm products={products} />
    </div>
  );
}
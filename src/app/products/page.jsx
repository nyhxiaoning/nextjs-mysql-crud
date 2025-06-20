
import axios from "axios";
import { ProductCard } from "@/components/ProductCard";

import allData from "@/consts/allData.ts";

async function loadProduct() {
  const { data } = await axios.get(`${allData.baseURL}/api/products`);
  console.log(data);
  return data;
}



async function ProductsPage() {
  const products = await loadProduct();
  if (products.length === 0) return <h1>No Products</h1>;

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductsPage;

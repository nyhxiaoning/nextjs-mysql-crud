
import axios from "axios";
import { ProductCard } from "@/components/ProductCard";

import allData from "@/consts/allData.ts";
import SearchBox from "../../components/SearchBox";



async function loadEmails() {
  const { data } = await axios.get(`${allData.baseURL}/api/emails`);
  console.log(data);
  console.log('data-----');
  return data;
}



async function ProductsPage() {
  const products = await loadEmails();
  if (products.length === 0) return <h1>No Products</h1>;

  return (
    <div >
      <SearchBox />
      {/* {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))} */}
    </div>
  );
}

export default ProductsPage;

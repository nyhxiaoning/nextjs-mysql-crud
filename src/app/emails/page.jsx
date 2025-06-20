
import axios from "axios";
import { ProductCard } from "@/components/ProductCard";

import allData from "@/consts/allData.ts";
import SearchBox from "../../components/SearchBox";



async function loadEmails() {
  try {
    const { data } = await axios.get(`${allData.baseURL}/api/emails`);
    console.log(data);
    console.log("data-----");
    return data;
  } catch (error) {
    console.log(error)
  }
 
}



async function ProductsPage() {
  try {
    const products = await loadEmails();
    if (products.length === 0) return <h1>No Products</h1>;
  
  } catch (error) {
    console.log(error);
  }

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

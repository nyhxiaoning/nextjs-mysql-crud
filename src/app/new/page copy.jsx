import axios from "axios";
import { ProductForm } from "@/components/ProductForm";
// 你用的是 Next.js 的 app 路由（app/ 目录），这里不能用 
function NewPage() {
  return (
    <div className="h-5/6 grid place-items-center">
      <ProductForm />
    </div>
  );
}
export default NewPage;

export const getServerSideProps = async (context) => {
  const res = await axios.get("http://localhost:3001/api/products");

  return {
    props: {
      products: res.data,
    },
  };
};

import Product from "@/model/Product";
import Category from "@/model/Category";
import SubCategory from "@/model/SubCategory";
import { connectDB } from "@/lib/mongodb";
import EditProductPage from "@/components/Admin/product/eidt/ProductEditPage";
import mongoose from "mongoose";

async function getProduct(id) {
  await connectDB();

  const product = await Product.findOne({
    _id: new mongoose.Types.ObjectId(id),
  })
    .populate("category", "name")
    .populate("subcategory", "name")
    .lean();

  console.log(product);

  if (!product) return null;

  return JSON.parse(JSON.stringify(product));
}

export const dynamic = "force-dynamic";

const page = async ({ params }) => {
  const { id } = await params;

  const product = await getProduct(id);

  return (
    <div>
      <EditProductPage product={product} />
    </div>
  );
};

export default page;

// app/product/[slug]/ProductDetailsWrapper.jsx

import ProductDetails from "@/components/Product_details_page/ProductDetails";
import { connectDB } from "@/lib/mongodb";
import Product from "@/model/Product";


export default async function ProductDetailsWrapper({ slug }) {
  await connectDB();

  const product = await Product.findOne({ slug })
    .populate("category", "name")
    .populate("subcategory", "name")
    .lean();

  if (!product) return <p>Product not found.</p>;

  return <ProductDetails product={JSON.parse(JSON.stringify(product))} />;
}

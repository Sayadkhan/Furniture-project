// app/product/[slug]/ProductDetailsWrapper.jsx

import ProductDetails from "@/components/Product_details_page/ProductDetails";
import { connectDB } from "@/lib/mongodb";
import Product from "@/model/Product";


export const dynamic = 'force-dynamic';


export default async function ProductDetailsWrapper({ slug }) {


  await connectDB();

  const product = await Product.findOne({ slug })
    .populate("category", "name")
    .populate("subcategory", "name")
    .lean();

    console.log(product)

  if (!product) return <p>Product not found.</p>;

  return <ProductDetails product={JSON.parse(JSON.stringify(product))} />;
}

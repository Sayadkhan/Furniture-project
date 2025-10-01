// app/category/[id]/ProductList.jsx
import { Suspense } from "react";
import ProductCard from "./ProductCard";
import { connectDB } from "@/lib/mongodb";
import Product from "@/model/Product";

export default async function ProductList({ id }) {
  await connectDB();

  const products = await Product.find({ category: id })
    .select("_id category subcategory")
    .populate("category", "name")
    .populate("subcategory", "name")
    .lean();

  if (!products || products.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-lg text-gray-500">No products found.</p>
      </div>
    );
  }

  const categoryName = products[0]?.category?.name || "Category";

  return (
    <section className="py-10">
      {/* Stylish Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800">{categoryName}</h1>
        <p className="text-gray-500 mt-2">
          Browse all products under <span className="font-medium">{categoryName}</span>
        </p>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((p) => (
            <Suspense key={p._id} fallback={<ProductSkeleton />}>
              <ProductCard productId={p._id.toString()} />
            </Suspense>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductSkeleton() {
  return <div className="animate-pulse bg-gray-200 rounded-xl h-56 shadow-md" />;
}

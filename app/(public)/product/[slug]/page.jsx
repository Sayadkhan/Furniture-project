// app/product/[slug]/page.jsx
import React, { Suspense } from "react";
import ProductDetailsWrapper from "./ProductDetailsWrapper";



export const dynamic = 'force-dynamic';


export default async function Page({ params }) {
  const { slug } = await params;

  return (
    <div className="container mx-auto min-h-screen p-6">
      {/* Product Info */}
      <Suspense fallback={<ProductSkeleton />}>
        <ProductDetailsWrapper slug={slug} />
      </Suspense>

      {/* Tabs (stream separately) */}
  
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="animate-pulse rounded-xl bg-gray-200 h-64 w-full" />
  );
}


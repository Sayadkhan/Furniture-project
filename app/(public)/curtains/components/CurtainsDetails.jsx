import { connectDB } from '@/lib/mongodb';
import Product from '@/model/Product';
import React from 'react';
import CurtainsProduct from './CurtainsProduct';

const CurtainsDetails = async ({ id }) => {
  await connectDB();

  // Fetch products with populated category/subcategory
  const products = await Product.find({ subcategory: id })
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

  // Convert all ObjectIds to strings and make it fully JSON-safe
  const serializedProducts = JSON.parse(
    JSON.stringify(
      products.map((product) => ({
        ...product,
        _id: product._id.toString(),
        category: product.category
          ? { ...product.category, _id: product.category._id.toString() }
          : null,
        subcategory: product.subcategory
          ? { ...product.subcategory, _id: product.subcategory._id.toString() }
          : null,
        childcategory: product.childcategory
          ? { ...product.childcategory, _id: product.childcategory._id.toString() }
          : null,
        variants: product.variants?.map((v) => ({
          ...v,
          _id: v._id?.toString(),
        })),
      }))
    )
  );

  return (
    <div>
      <CurtainsProduct products={serializedProducts} />
    </div>
  );
};

export default CurtainsDetails;

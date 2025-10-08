import { connectDB } from '@/lib/mongodb';
import Product from '@/model/Product';
import React from 'react'
import CurtainsProduct from './CurtainsProduct';

const CurtainsDetails = async ({id}) => {

   await connectDB();
  
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



  return (
    <div>
      <CurtainsProduct products={products}/>
    </div>
  )
}

export default CurtainsDetails

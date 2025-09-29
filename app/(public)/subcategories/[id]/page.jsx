import ProductPage from '@/components/product/ProductPage';
import { connectDB } from '@/lib/mongodb';
import Product from '@/model/Product';
import React from 'react'

async function getProduct(id) { 
  await connectDB(); 
  const product = await Product.find({ subcategory: id }) 
  .populate("category", "name")
  .populate("subcategory", "name")
  .lean(); 
   
  if (!product) return null; 
  
  return JSON.parse(JSON.stringify(product)); 
}

const page = async ({params}) => {
  
  const {id} = await params;
  const product = await getProduct(id);

  console.log(product)


  return (
    <div>
      <ProductPage product={product}/>
    </div>
  )
}

export default page

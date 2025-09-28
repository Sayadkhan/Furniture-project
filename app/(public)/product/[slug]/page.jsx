
import ProductDetails from '@/components/Product_details_page/ProductDetails'
import ProductsTabs from '@/components/Product_details_page/ProductsTabs'
import { connectDB } from '@/lib/mongodb';
import Product from '@/model/Product';
import Category from '@/model/Category';
import SubCategory from '@/model/SubCategory';
import React from 'react'


async function getProduct(slug) { 
  await connectDB(); 
  const product = await Product.findOne({ slug }) 
  .populate("category", "name")
  .populate("subcategory", "name")
  .lean(); 
   
  if (!product) return null; 
  
  return JSON.parse(JSON.stringify(product)); 
}


const page = async ({params}) => {

  const {slug} = await params;
  const product = await getProduct(slug);

  return (
    <>
    <ProductDetails product={product} />

    </>
  )
}

export default page
import ShopClient from '@/components/Shop_Page/ShopClient'
import { connectDB } from '@/lib/mongodb';
import Product from '@/model/Product';
import Category from '@/model/Category';
import SubCategory from '@/model/SubCategory';


// import ShopClient from "./ShopClient";

async function getProducts() {
  await connectDB();
  const products = await Product.find({})
    .populate("category","name")
    .populate("subcategory", "name")
    .lean();
  return JSON.parse(JSON.stringify(products));
}


export const dynamic = 'force-dynamic';


const page = async () => {
  const products = await getProducts();

  return (
    <>
    <ShopClient products={products}/>
    </>
  )
}

export default page
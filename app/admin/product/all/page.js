// // app/shop/page.jsx (Server Component)
// import dbConnect from "@/lib/dbConnect";
// import Product from "@/models/Product";
// // import ShopClient from "./ShopClient";

// async function getProducts() {
//   await dbConnect();
//   const products = await Product.find({})
//     .populate("category")
//     .populate("subcategory")
//     .lean();
//   return JSON.parse(JSON.stringify(products));
// }

// export default async function ShopPage() {
//   const products = await getProducts();

//   // return <ShopClient products={products} />;
// }

// // app/shop/ShopClient.jsx (Client Component)

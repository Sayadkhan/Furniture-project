import { connectDB } from '@/lib/mongodb';
import Order from '@/model/Order';
import Product from '@/model/Product';

import React from 'react'
import DashboardPage from './DashboardPage';

// ✅ Fetch data directly from MongoDB
async function getDashboardStats() {
  await connectDB();

  const [products, orders] = await Promise.all([
    Product.countDocuments({}), 
    Order.find({}, "totalPrice").lean(), 
  ]);

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);

  return { totalProducts: products, totalOrders, totalRevenue };
}



export const dynamic = 'force-dynamic';

const DashboardData = async () => {
    const { totalProducts, totalOrders, totalRevenue } = await getDashboardStats();


  return (
    <div>
      <DashboardPage totalProducts={totalProducts} totalOrders={totalOrders} totalRevenue={totalRevenue}/>
    </div>
  )
}

export default DashboardData

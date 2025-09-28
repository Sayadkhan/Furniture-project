import { connectDB } from "@/lib/mongodb";
import Order from "@/model/Order";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const order = await Order.create(body);
    console.log(order);
    return new Response(JSON.stringify(order), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Error creating order", { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    return new Response("Error fetching orders", { status: 500 });
  }
}

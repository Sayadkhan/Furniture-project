import { connectDB } from "@/lib/mongodb";
import Coupon from "@/model/Coupon";
import Order from "@/model/Order";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // 🛒 calculate subtotal
    const subtotal = body.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    let discountAmount = 0;
    let appliedCoupon = null;

    // 🎟️ check coupon if provided
    if (body.couponCode) {
      const coupon = await Coupon.findOne({
        code: body.couponCode,
        isActive: true,
      });

      if (!coupon) {
        return new Response(JSON.stringify({ error: "Invalid coupon" }), {
          status: 400,
        });
      }

      // check expiry
      if (coupon.expiry && new Date(coupon.expiry) < new Date()) {
        return new Response(JSON.stringify({ error: "Coupon expired" }), {
          status: 400,
        });
      }

      // check minPurchase
      if (coupon.minPurchase && subtotal < coupon.minPurchase) {
        return new Response(
          JSON.stringify({
            error: `Minimum purchase must be ${coupon.minPurchase}`,
          }),
          { status: 400 }
        );
      }

      // calculate discount
      if (coupon.discountType === "percentage") {
        discountAmount = (subtotal * coupon.discountValue) / 100;
      } else if (coupon.discountType === "fixed") {
        discountAmount = coupon.discountValue;
      }

      // prevent negative totals
      if (discountAmount > subtotal) discountAmount = subtotal;

      // snapshot coupon details
      appliedCoupon = {
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        discountAmount,
        couponId: coupon._id,
      };

      // update coupon usage
      coupon.usageCount = (coupon.usageCount || 0) + 1;
      await coupon.save();
    }

    // final total after discount
    const totalPrice = subtotal - discountAmount;

    const orderData = {
      ...body,
      subtotal,
      totalPrice,
      coupon: appliedCoupon,
    };

    const order = await Order.create(orderData);

    return new Response(JSON.stringify(order), { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);
    return new Response(JSON.stringify({ error: "Error creating order" }), {
      status: 500,
    });
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

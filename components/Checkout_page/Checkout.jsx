"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import countries from "world-countries";
import { useRouter } from "next/navigation";
import { clearCart } from "@/redux/slice/CartSlice";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    country: "Bangladesh",
    address: "",
    city: "",
    postal: "",
    email: "",
  });

  const countryList = countries.map((c) => ({
    name: c.name.common,
    code: c.cca2,
  }));

  const dispatch = useDispatch();
  const router = useRouter();

  const { items, totalPrice } = useSelector((state) => state.cart);

  console.log(items)

  const [shipping, setShipping] = useState("free");
  const [payment, setPayment] = useState("bank");

  // 🎟️ coupon state
  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // redirect if cart empty
  useEffect(() => {
    if (items.length === 0) {
      router.push("/shop");
    }
  }, [items, router]);

  // shipping cost
  const shippingCost =
    shipping === "flat" ? 5 : shipping === "local" ? 10 : 0;

  // subtotal before discount
  const subtotal = totalPrice;

  // final total
  const grandTotal = subtotal - discountAmount + shippingCost;

  // 🎟️ handle apply coupon (calls backend for validation)
  const handleApplyCoupon = async () => {
    if (!couponCode) return toast.error("Enter a coupon code");

    try {
      const res = await fetch("/api/coupon/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode, subtotal }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Invalid coupon");

      setDiscountAmount(data.discountAmount);
      setAppliedCoupon(data);
      toast.success(`Coupon "${couponCode}" applied!`);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      setDiscountAmount(0);
      setAppliedCoupon(null);
    }
  };

  // Handle Order
  const handlePlaceOrder = async () => {
    try {
      const res = await fetch("/api/Order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          items,
          shippingMethod: shipping,
          paymentMethod: payment,
          couponCode: appliedCoupon?.code || null, // 🎟️ send coupon
        }),
      });

      if (!res.ok) throw new Error("Order failed");
      await res.json();

      toast.success("✅ Your Order is Successful");
      dispatch(clearCart());
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to place order.");
    }
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
        {/* ---------------- Billing Form ---------------- */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-semibold mb-6">Billing details</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First name *"
                className="w-full border p-3 rounded-lg"
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Last name *"
                className="w-full border p-3 rounded-lg"
                value={form.lastName}
                onChange={(e) =>
                  setForm({ ...form, lastName: e.target.value })
                }
              />
            </div>
            <input
              type="text"
              placeholder="Phone *"
              className="w-full border p-3 rounded-lg"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <select
              className="w-full border p-3 rounded-lg"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
            >
              {countryList.map((c) => (
                <option key={c.code} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Address *"
              className="w-full border p-3 rounded-lg"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
            <input
              type="text"
              placeholder="Town / City *"
              className="w-full border p-3 rounded-lg"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
            <input
              type="text"
              placeholder="Postcode / ZIP *"
              className="w-full border p-3 rounded-lg"
              value={form.postal}
              onChange={(e) => setForm({ ...form, postal: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email address *"
              className="w-full border p-3 rounded-lg"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <textarea
              placeholder="Order notes (optional)"
              className="w-full border p-3 rounded-lg"
            />
          </form>
        </div>

        {/* ---------------- Right Side - Order & Payment ---------------- */}
        <div className="border p-6 rounded-lg">
          <h2 className="text-lg font-semibold pb-3 border-b mb-6">
            Your order
          </h2>

          {/* Order Items */}
          <div className="space-y-4 max-h-[300px] overflow-y-auto">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.variant?._id || "base"}`}
                className="flex justify-between items-start border-b pb-3"
              >
                <div className="flex gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-[16px] font-medium">{item.name}</p>
                    {item.variant && (
                      <p className="text-xs text-gray-500">
                        {item.variant.attributes.color} -{" "}
                        {item.variant.attributes.size}
                      </p>
                    )}
                    <p className="text-[14px] text-gray-500">
                      ${item.price} × {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="text-[16px] font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Coupon Input */}
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              placeholder="Coupon code"
              className="flex-1 border p-3 rounded-lg"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button
              type="button"
              onClick={handleApplyCoupon}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-black transition cursor-pointer"
            >
              Apply
            </button>
          </div>

          {/* Price Breakdown */}
          <div className="border-t mt-4 pt-4 space-y-2 text-[16px]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-green-600 font-medium">
                <span>Discount ({appliedCoupon?.code})</span>
                <span>- ${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-[18px]">
              <span>Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Shipping Options */}
          <div className="border-t py-4">
            <p className="font-medium mb-3 text-[18px]">Shipping</p>
            <div className="space-y-2 text-[16px]">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={shipping === "free"}
                  onChange={() => setShipping("free")}
                />
                Free shipping
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={shipping === "flat"}
                  onChange={() => setShipping("flat")}
                />
                Flat rate: <span className="ml-1">$5</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={shipping === "local"}
                  onChange={() => setShipping("local")}
                />
                Local pickup: <span className="ml-1">$10</span>
              </label>
            </div>
          </div>

          {/* Payment Section */}
          <div className="mt-6 flex flex-col gap-3 text-[16px]">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={payment === "bank"}
                onChange={() => setPayment("bank")}
              />
              Direct bank transfer
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={payment === "check"}
                onChange={() => setPayment("check")}
              />
              Check payments
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={payment === "cod"}
                onChange={() => setPayment("cod")}
              />
              Cash on delivery
            </label>
          </div>

          {/* Place Order */}
          <button
            onClick={handlePlaceOrder}
            className="w-full mt-6 bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

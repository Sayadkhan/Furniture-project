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
    notes: "",
  });

  const countryList = countries
    .map((c) => ({
      name: c.name.common,
      code: c.cca2,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const dispatch = useDispatch();
  const router = useRouter();
  const { items, totalPrice } = useSelector((state) => state.cart);

  const [shipping, setShipping] = useState("free");
  const [payment, setPayment] = useState("bank");
  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [loadingOrder, setLoadingOrder] = useState(false);

  useEffect(() => {
    if (!items || items.length === 0) {
      router.push("/shop");
    }
  }, [items, router]);

  const shippingCost =
    shipping === "flat" ? 5 : shipping === "local" ? 10 : 0;

  const subtotal = totalPrice;
  const grandTotal = subtotal - discountAmount + shippingCost;

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return toast.error("Please enter a coupon code");

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
      toast.error(error.message);
      setDiscountAmount(0);
      setAppliedCoupon(null);
    }
  };

  const handlePlaceOrder = async () => {
    if (
      !form.firstName ||
      !form.lastName ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.postal ||
      !form.email
    ) {
      return toast.error("⚠️ Please fill all required fields");
    }

    try {
      setLoadingOrder(true);
      const res = await fetch("/api/Order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          items,
          shippingMethod: shipping,
          paymentMethod: payment,
          couponCode: appliedCoupon?.code || null,
          total: grandTotal,
        }),
      });

      if (!res.ok) throw new Error("Order failed");

      await res.json();
      router.push("/thank-you");
      toast.success("✅ Your order was placed successfully!");
      dispatch(clearCart());
    } catch (error) {
      toast.error("❌ Failed to place order. Try again later.");
    } finally {
      setLoadingOrder(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Billing Form */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="text-2xl font-semibold mb-6">Billing details</h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First name *"
                required
                className={inputField}
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              />
              <input
                type="text"
                placeholder="Last name *"
                required
                className={inputField}
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              />
            </div>

            {/* Phone + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="tel"
                placeholder="Phone *"
                required
                className={inputField}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email address *"
                required
                className={inputField}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            {/* Country */}
            <select
              className={inputField}
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
            >
              {countryList.map((c) => (
                <option key={c.code} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Address */}
            <input
              type="text"
              placeholder="Street address *"
              required
              className={inputField}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />

            {/* City + Postal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Town / City *"
                required
                className={inputField}
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
              <input
                type="text"
                placeholder="Postcode / ZIP *"
                required
                className={inputField}
                value={form.postal}
                onChange={(e) => setForm({ ...form, postal: e.target.value })}
              />
            </div>

            {/* Notes */}
            <textarea
              placeholder="Order notes (optional)"
              className={inputField}
              rows={3}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white border p-6 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold pb-3 border-b mb-6">Your order</h2>

          {/* Cart Items */}
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.variant?._id || "base"}`}
                className="flex justify-between items-start border-b pb-3"
              >
                <div className="flex gap-3">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={48}
                    height={48}
                    className="rounded-md object-contain border"
                  />
                  <div>
                    <p className="text-[15px] font-medium">{item.name}</p>
                    {item.variant && (
                      <p className="text-xs text-gray-500">
                        {item.variant.attributes.color} - {item.variant.attributes.size}
                      </p>
                    )}
                    <p className="text-sm text-gray-500">
                      ${item.price} × {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="text-[15px] font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Coupon */}
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              placeholder="Coupon code"
              className={inputField + " flex-1"}
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button
              type="button"
              onClick={handleApplyCoupon}
              className={btnSecondary}
            >
              Apply
            </button>
          </div>

          {/* Totals */}
          <div className="border-t mt-4 pt-4 space-y-2 text-[15px]">
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
            <div className="flex justify-between font-semibold text-[17px]">
              <span>Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Shipping Methods */}
          <div className="border-t py-4">
            <p className="font-medium mb-3">Shipping</p>
            <div className="space-y-2">
              {[
                { id: "free", label: "Free shipping", price: 0 },
                { id: "flat", label: "Flat rate", price: 5 },
                { id: "local", label: "Local pickup", price: 10 },
              ].map((opt) => (
                <label key={opt.id} className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="radio"
                    checked={shipping === opt.id}
                    onChange={() => setShipping(opt.id)}
                  />
                  {opt.label} {opt.price > 0 && <span className="ml-1">${opt.price}</span>}
                </label>
              ))}
            </div>
          </div>

          {/* Payment */}
          <div className="mt-6 flex flex-col gap-3">
            {[
              { id: "bank", label: "Direct bank transfer" },
              { id: "check", label: "Check payments" },
              { id: "cod", label: "Cash on delivery" },
            ].map((opt) => (
              <label key={opt.id} className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  checked={payment === opt.id}
                  onChange={() => setPayment(opt.id)}
                />
                {opt.label}
              </label>
            ))}
          </div>

          {/* Place Order */}
          <button
            onClick={handlePlaceOrder}
            disabled={loadingOrder}
            className={btnPrimary + " w-full mt-6"}
          >
            {loadingOrder ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Reusable Tailwind styles
const inputField =
  "w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-black focus:outline-none transition";
const btnPrimary =
  "bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition disabled:opacity-60 disabled:cursor-not-allowed";
const btnSecondary =
  "bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-black transition cursor-pointer";

export default CheckoutPage;

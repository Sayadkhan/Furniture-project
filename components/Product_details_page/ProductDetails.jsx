"use client";
import { useState } from "react";
import {
  Star, Eye, Truck, RefreshCcw,
  Heart, Share2, HelpCircle, BarChart, X
} from "lucide-react";
import Image from "next/image";
import ProductFeatuImg from "../../public/hero-2.jpg";

const ProductDetails = () => {
  const [numberCount, setNumberCount] = useState(1);
  const [openCart, setOpenCart] = useState(false); // NEW: drawer state

  return (
    <>
      <div className="py-[100px]">
        <div className="container mx-auto">
          <div className="flex justify-between">
            {/* ---------------item-left------------ */}
            <div className="w-[48%] h-[450px]">
              <Image
                className="w-full h-full object-cover"
                src={ProductFeatuImg}
                alt="Product"
              />
            </div>

            {/* ---------------item-right------------ */}
            <div className="w-[48%]">
              <p className="text-[16px] text-gray-500">
                Brand: <span className="font-medium text-gray-700">Gallery</span>
              </p>
              <h1 className="text-[28px] font-semibold mt-1">
                Ikea Hol Acacia Side Table Wooden
              </h1>           
              <div className="flex items-center gap-3 mt-2">
                <span className="text-2xl font-semibold">$200</span>
                <div className="flex items-center gap-1 text-yellow-500">
                  {[...Array(3)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500" />
                  ))}
                  <span className="text-gray-700 text-[16px]">(3 review)</span>
                </div>
              </div>     
              <div className="bg-red-50 text-red-600 mt-4 py-3 px-6 rounded-md text-[15px] font-medium inline-block">
                Selling fast! Over 12 people have in their cart
              </div>

              <ul className="list-disc list-inside mt-4 space-y-1 text-gray-700 text-[16px]">
                <li>Mattress Support Is Mdf Board.</li>
                <li>Recommended Mattress Size: 78 X 60 Inches.</li>
                <li>The Product Will Require Carpenter For Assembly.</li>
              </ul>

              {/* ---------------Quantity + Buttons------------ */}             
              <div className="flex items-center gap-3 mt-6">
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={() => setNumberCount(Math.max(1, numberCount - 1))}
                    className="px-3 py-1 text-lg"
                  >
                    –
                  </button>
                  <span className="px-4">{numberCount}</span>
                  <button
                    onClick={() => setNumberCount(numberCount + 1)}
                    className="px-3 py-1 text-lg"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => setOpenCart(true)}
                  className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800"
                >
                  Add To Cart
                </button>
                <button className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800">
                  Buy Now
                </button>
              </div>

              {/* --------------------Bottom actions--------------- */}
              <div className="flex items-center gap-6 mt-8 text-gray-600 text-[18px]">
                <button className="flex items-center gap-1 hover:text-black">
                  <BarChart className="w-4 h-4" />Compare
                </button>
                <button className="flex items-center gap-1 hover:text-black">
                  <Heart className="w-4 h-4" />Wishlist
                </button>
                <button className="flex items-center gap-1 hover:text-black">
                  <HelpCircle className="w-4 h-4" />Ask Us
                </button>
                <button className="flex items-center gap-1 hover:text-black">
                  <Share2 className="w-4 h-4" />Share
                </button>
              </div>

              <hr className="my-6" />

              <p className="flex items-center gap-1 text-gray-700 text-[18px]">
                <Eye className="w-4 h-4" /> 24 people are viewing this right now
              </p>

              <div className="mt-5 space-y-1 text-[16px] text-gray-700">
                <p className="flex items-center gap-1">
                  <Truck className="w-4 h-4" /> Estimated Delivery: Up to 4 business days
                </p>
                <p className="flex items-center gap-1">
                  <RefreshCcw className="w-4 h-4" /> Free Shipping & Returns: On all orders over $200
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------Cart Drawer-------------- */}
      {openCart && (
        <div
          onClick={() => setOpenCart(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-xl z-50 transform transition-transform duration-300
        ${openCart ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b mb-10">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
          <button onClick={() => setOpenCart(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 flex items-center border-b">
          <Image src={ProductFeatuImg} alt="cart item" width={60} height={60} className="border rounded" />
          <div className="ml-4 flex-1">
            <p className="text-sm font-medium">Ikea Hol Acacia Side Table Wooden</p>
            <p className="text-sm text-gray-600">{numberCount} × $200</p>
          </div>
          <button className="text-red-500 text-xl">&times;</button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="flex justify-between mb-4">
            <span className="font-medium">Subtotal:</span>
            <span className="font-semibold">${200 * numberCount}</span>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 bg-gray-700 text-white py-2 rounded hover:bg-gray-800">
              View Cart
            </button>
            <button className="flex-1 bg-black text-white py-2 rounded hover:bg-gray-800">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;

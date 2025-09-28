"use client";
import { useState } from "react";
import {
  Star, Eye, Truck, RefreshCcw,
  Heart, Share2, HelpCircle, BarChart, X
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ProductsTabs from "./ProductsTabs";

const ProductDetails = ({ product }) => {
  const [numberCount, setNumberCount] = useState(1);
  const [openCart, setOpenCart] = useState(false);

  // Track selected variant
  const [selectedVariant, setSelectedVariant] = useState(null);

  // fallback to base product or variant values
  const activePrice = selectedVariant ? selectedVariant.price : product.price;
  const activeStock = selectedVariant ? selectedVariant.stock : product.stock;
  const activeImage = selectedVariant
    ? selectedVariant.images?.[0] || product.images?.[0]
    : product.images?.[0];

  // calculate discounted price
  const discountedPrice =
    product.discountType === "percentage"
      ? activePrice - (activePrice * product.discount) / 100
      : activePrice - product.discount;

  // handle variant select
  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
    setNumberCount(1);
  };

  return (
    <>
      <div className="py-[100px]">
        <div className="container mx-auto">
          <div className="flex justify-between">
            {/* -------- Left: main image ---------- */}
            <div className="w-[48%] h-[550px]">
              <Image
                className="w-full h-full object-cover"
                src={activeImage || "/placeholder.png"}
                alt={product.name}
                width={500}
                height={500}
              />
            </div>

            {/* -------- Right: info ---------- */}
            <div className="w-[48%]">
              <p className="text-[16px] text-gray-500">
                Category:{" "}
                <span className="font-medium text-gray-700">
                  {product.category?.name}
                </span>
              </p>
              <h1 className="text-[28px] font-semibold mt-1">{product.name}</h1>

              <div className="flex items-center gap-3 mt-2">
                <span className="text-2xl font-semibold">${discountedPrice}</span>
                {product.discount > 0 && (
                  <span className="line-through text-gray-500">
                    ${activePrice}
                  </span>
                )}
                <div className="flex items-center gap-1 text-yellow-500">
                  {[...Array(3)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500" />
                  ))}
                  <span className="text-gray-700 text-[16px]">(3 review)</span>
                </div>
              </div>

              <div className="bg-red-50 text-red-600 mt-4 py-3 px-6 rounded-md text-[15px] font-medium inline-block">
                Only {activeStock} left in stock!
              </div>

              <p className="mt-4 text-gray-700 text-[16px]">{product.shortDesc}</p>

              {/* -------- Variants ---------- */}
              {product.variants?.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h3 className="font-medium text-lg">Available Options:</h3>
                <div className="flex gap-3 flex-wrap">
                    {product.variants.map((variant) => (
                      <button
                        key={variant._id}
                        onClick={() => handleVariantSelect(variant)}
                        className={`flex items-center gap-2 px-4 py-2 border rounded-md ${
                          selectedVariant?._id === variant._id
                            ? "border-black bg-gray-100"
                            : "border-gray-300"
                        }`}
                      >
                        {/* Color swatch */}
                        <span
                          className="w-5 h-5 rounded-full border"
                          style={{ backgroundColor: variant.attributes.hexCode || "#ccc" }}
                        ></span>

                        {/* Color name + size */}
                        <span className="block font-medium">
                          {variant.attributes.color} - {variant.attributes.size}
                        </span>

                        {/* Price & Stock */}
                        <span className="text-sm text-gray-500 ml-2">
                          ${variant.price} | {variant.stock} left
                        </span>
                      </button>
                    ))}
                </div>

                </div>
              )}

              {/* -------- Quantity + Buttons ---------- */}
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
                    onClick={() =>
                      setNumberCount(Math.min(activeStock, numberCount + 1))
                    }
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

              {/* -------- Bottom Actions ---------- */}
              <div className="flex items-center gap-6 mt-8 text-gray-600 text-[18px]">
                <button className="flex items-center gap-1 hover:text-black">
                  <BarChart className="w-4 h-4" />
                  Compare
                </button>
                <button className="flex items-center gap-1 hover:text-black">
                  <Heart className="w-4 h-4" />
                  Wishlist
                </button>
                <button className="flex items-center gap-1 hover:text-black">
                  <HelpCircle className="w-4 h-4" />
                  Ask Us
                </button>
                <button className="flex items-center gap-1 hover:text-black">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>

              <hr className="my-6" />

              <p className="flex items-center gap-1 text-gray-700 text-[18px]">
                <Eye className="w-4 h-4" /> 24 people are viewing this right now
              </p>

              <div className="mt-5 space-y-1 text-[16px] text-gray-700">
                <p className="flex items-center gap-1">
                  <Truck className="w-4 h-4" /> Estimated Delivery: Up to 4
                  business days
                </p>
                <p className="flex items-center gap-1">
                  <RefreshCcw className="w-4 h-4" /> Free Shipping & Returns: On
                  orders over $200
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <ProductsTabs />
          </div>
        </div>
      </div>

    </>
  );
};

export default ProductDetails;

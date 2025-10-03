"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Star,
  Eye,
  Truck,
  RefreshCcw,
  Heart,
  Share2,
  HelpCircle,
  BarChart,
} from "lucide-react";
import Image from "next/image";
import ProductsTabs from "./ProductsTabs";
import { toast } from "react-toastify";
import { addToCart } from "@/redux/slice/CartSlice";

const ProductDetails = ({ product, userId }) => {
  const dispatch = useDispatch();

  const [numberCount, setNumberCount] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);

  // Helpers
  const getDiscountedPrice = (price) => {
    if (!product?.discount || product?.discount <= 0) return price;

    return product?.discountType === "percentage"
      ? price - (price * product?.discount) / 100
      : price - product?.discount;
  };

  // Active product values (base or variant)
  const activePrice = selectedVariant ? selectedVariant?.price : product?.price;
  const activeStock = selectedVariant ? selectedVariant?.stock : product?.stock;
  const activeImage = selectedVariant
    ? selectedVariant?.images?.[0] || product?.images?.[0]
    : product?.images?.[0];
  const discountedPrice = getDiscountedPrice(activePrice);

  // Handle variant select
  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
    setNumberCount(1);
  };

  // ✅ Add To Cart Logic
  const handleAddToCart = () => {
    if (product?.variants?.length > 0 && !selectedVariant) {
      toast.error("⚠️ Please select a variant first");
      return;
    }

    if (activeStock < 1) {
      toast.error("❌ This item is out of stock");
      return;
    }

    dispatch(
      addToCart({
        userId: userId || "guest",
        productId: product?._id,
        name: product?.name,
        price: discountedPrice,
        quantity: numberCount,
        variant: selectedVariant,
        image: activeImage,
      })
    );

    toast.success(
      `✅ Added ${numberCount} x ${
        selectedVariant?.attributes?.color || product?.name
      } to cart`
    );
  };

  return (
    <>
      <div className="py-[100px]">
        <div className="container mx-auto">
          {/* ------- Layout (Responsive Grid) -------- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* -------- Left: main image ---------- */}
            <div className="h-[350px] md:h-[550px] rounded-lg overflow-hidden">
              {activeImage ? (
                <Image
                  className="w-full h-full object-cover"
                  src={activeImage}
                  alt={product?.name}
                  width={500}
                  height={500}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
            </div>

            {/* -------- Right: info ---------- */}
            <div>
              <p className="text-[16px] text-gray-500">
                Category:{" "}
                <span className="font-medium text-gray-700">
                  {product?.category?.name}
                </span>
              </p>
              <h1 className="text-[28px] font-semibold mt-1">
                {product?.name}
              </h1>

              {/* Price + Discount + Rating */}
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <span className="text-2xl font-semibold">
                  ${discountedPrice}
                </span>
                {product?.discount > 0 && (
                  <span className="line-through text-gray-500">
                    ${activePrice}
                  </span>
                )}
                <div className="flex items-center gap-1 text-yellow-500">
                  {[...Array(3)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500" />
                  ))}
                  <span className="text-gray-700 text-[16px]">(3 reviews)</span>
                </div>
              </div>

              {/* Stock */}
              {activeStock > 0 ? (
                <div className="bg-green-50 text-green-600 mt-4 py-3 px-6 rounded-md text-[15px] font-medium inline-block">
                  In stock: {activeStock}
                </div>
              ) : (
                <div className="bg-red-50 text-red-600 mt-4 py-3 px-6 rounded-md text-[15px] font-medium inline-block">
                  Out of stock!
                </div>
              )}

              {/* Short Desc */}
              <p className="mt-4 text-gray-700 text-[16px]">
                {product?.shortDesc}
              </p>

              {/* -------- Variants ---------- */}
              {product?.variants?.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h3 className="font-medium text-lg">Available Options:</h3>
                  <div className="flex gap-3 flex-wrap">
                    {product?.variants?.map((variant) => (
                      <button
                        key={variant?._id}
                        onClick={() => handleVariantSelect(variant)}
                        className={`flex items-center gap-2 px-4 py-2 border rounded-md ${
                          selectedVariant?._id === variant?._id
                            ? "border-black bg-gray-100"
                            : "border-gray-300"
                        }`}
                      >
                        {/* Color swatch */}
                        <span
                          className="w-5 h-5 rounded-full border"
                          style={{
                            backgroundColor:
                              variant?.attributes?.hexCode || "#ccc",
                          }}
                        ></span>

                        {/* Color + Size */}
                        <span className="block font-medium">
                          {variant?.attributes?.color} -{" "}
                          {variant?.attributes?.size}
                        </span>

                        {/* Price & Stock */}
                        <span className="text-sm text-gray-500 ml-2">
                          ${variant?.price} | {variant?.stock} left
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* -------- Quantity + Buttons ---------- */}
              <div className="flex items-center gap-3 mt-6 flex-wrap">
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
                  onClick={handleAddToCart}
                  className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800"
                >
                  Add To Cart
                </button>
                {/* <button className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800">
                  Buy Now
                </button> */}
              </div>

              {/* Wishlist + Compare */}
              <div className="flex gap-6 mt-5 text-gray-600">
                <button className="flex items-center gap-2 hover:text-black">
                  <Heart className="w-4 h-4" /> Add to Wishlist
                </button>
                <button className="flex items-center gap-2 hover:text-black">
                  <BarChart className="w-4 h-4" /> Compare
                </button>
              </div>
            </div>
          </div>

          {/* -------- Tabs Section ---------- */}
          <div className="mt-10">
            <ProductsTabs product={product} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;

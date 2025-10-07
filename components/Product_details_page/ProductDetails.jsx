"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Star, Heart } from "lucide-react";
import Image from "next/image";
import ProductsTabs from "./ProductsTabs";
import { toast } from "react-toastify";
import { addToCart } from "@/redux/slice/CartSlice";

const ProductDetails = ({ product, userId, reviews }) => {

  const dispatch = useDispatch();
  const [numberCount, setNumberCount] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const getDiscountedPrice = (price) => {
    if (!product?.discount || product?.discount <= 0) return price;
    return product?.discountType === "percentage"
      ? price - (price * product?.discount) / 100
      : price - product?.discount;
  };

  const activePrice = selectedVariant ? selectedVariant?.price : product?.price;
  const activeStock = selectedVariant ? selectedVariant?.stock : product?.stock;
  const discountedPrice = getDiscountedPrice(activePrice);

  const images = selectedVariant?.images?.length
    ? selectedVariant.images
    : product?.images || [];

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
    setNumberCount(1);
    setActiveImageIndex(0);
  };

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
        image: images[activeImageIndex],
      })
    );

    toast.success(
      `✅ Added ${numberCount} x ${
        selectedVariant?.attributes?.color || product?.name
      } to cart`
    );
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto  md:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

          {/* Left: Image Gallery */}
          <div
            className={
              images.length > 1
                ? "grid grid-cols-1 sm:grid-cols-[18%_82%] gap-3"
                : "flex justify-center"
            }
          >
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex sm:flex-col flex-row sm:gap-2 gap-3 justify-center sm:mt-0 mt-2">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 sm:w-20 sm:h-20 border rounded-md overflow-hidden cursor-pointer transition ${
                      activeImageIndex === idx
                        ? "border-black ring-2 ring-gray-400"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={product.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Main Image */}
            <div className="relative w-full h-[350px] sm:h-[420px] md:h-[500px] lg:h-[550px] border border-gray-200 rounded-lg overflow-hidden">
              {images.length > 0 ? (
                <Image
                  src={images[activeImageIndex]}
                  alt={product?.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="px-1 sm:px-2 md:px-0">
            <p className="text-gray-500 mb-1">
              Category:{" "}
              <span className="font-medium text-gray-700">
                {product?.category?.name}
              </span>
            </p>

            <h1 className="text-2xl sm:text-3xl font-bold leading-snug">
              {product?.name}
            </h1>

            {/* Price & Rating */}
            <div className="flex items-center gap-4 mt-3 flex-wrap">
              <span className="text-2xl sm:text-3xl font-semibold text-black">
                ${discountedPrice}
              </span>
              {product?.discount > 0 && (
                <span className="line-through text-gray-400">
                  ${activePrice}
                </span>
              )}
           {product?.averageRating > 0 && (
            
              <div className="flex items-center gap-1 text-yellow-500">
                {[...Array(product?.averageRating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-500" />
                ))}
                <span className="text-gray-600 ml-1 sm:ml-2 text-sm">
                  {reviews.length}
                </span>
              </div>
           )
             
           }
            </div>

            {/* Stock */}
            <div
              className={`mt-4 py-2 px-4 rounded-md inline-block text-sm font-medium ${
                activeStock > 0
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {activeStock > 0
                ? `In stock: ${activeStock}`
                : "Out of stock!"}
            </div>

            {/* Short Description */}
            <p className="mt-4 text-gray-700 text-sm sm:text-base leading-relaxed">
              {product?.shortDesc}
            </p>

            {/* Variants */}
            {product?.variants?.length > 0 && (
              <div className="mt-6 space-y-3">
                <h3 className="font-medium text-lg">Options:</h3>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant._id}
                      onClick={() => handleVariantSelect(variant)}
                      className={`flex items-center gap-2 px-3 sm:px-4 py-2 border rounded-md transition text-sm sm:text-base ${
                        selectedVariant?._id === variant._id
                          ? "border-black bg-gray-100"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full border"
                        style={{
                          backgroundColor:
                            variant.attributes?.hexCode || "#ccc",
                        }}
                      ></span>
                      <span className="font-medium">
                        {variant.attributes?.color} -{" "}
                        {variant.attributes?.size}
                      </span>
                      <span className="text-gray-500 text-xs sm:text-sm ml-1 sm:ml-2">
                        ${variant.price} | {variant.stock} left
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Add To Cart */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-6">
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
                className="bg-black text-white px-5 sm:px-6 py-2 rounded-md hover:bg-gray-800 transition text-sm sm:text-base"
              >
                Add To Cart
              </button>

              <button className="flex items-center gap-2 px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50 transition text-sm sm:text-base">
                <Heart className="w-4 h-4" /> Wishlist
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-10">
          <ProductsTabs product={product} images={images} reviews={reviews} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

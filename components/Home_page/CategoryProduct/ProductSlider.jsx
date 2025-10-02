"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductSlider = ({ products }) => {
  if (!products || products.length === 0) {
    return <p className="text-gray-500 italic">No products in this category</p>;
  }

  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={20}
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 1 },
        1024: { slidesPerView: 3 },
      }}
      navigation
      // pagination={{ clickable: true }}
      className="pb-10"
    >
      {products.map((product) => (
        <SwiperSlide key={product._id}>
          <div className="p-[10px] shadow-2xl rounded-xl group bg-white border-2">
            <div className="w-full h-[200px] md:h-[250px] lg:h-[300px] overflow-hidden rounded-lg">
           <Link   href={`/product/${product.slug}`}>
              <Image
                src={
                  product.images[0] ||
                  "https://via.placeholder.com/300x200.png?text=No+Image"
                }
                alt={product.name}
                width={300}
                height={200}
                className="w-full h-full object-cover group-hover:scale-125 transition-all duration-300"
              />
              </Link>
            </div>
            <div className="text-center mt-5">
              <span className="text-[15px] font-normal">{product.name}</span>
              <h4 className="text-[20px] font-semibold mt-2 text-amber-700">
                ${product.price}
              </h4>
              <Link
                href={`/product/${product.slug}`}
                className="text-[14px] font-medium px-5 py-2 bg-black text-white block mt-3 rounded-lg hover:bg-gray-800 transition"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductSlider;

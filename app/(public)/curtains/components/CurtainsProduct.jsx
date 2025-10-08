"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X, PhoneCall, MessageCircle } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  Keyboard,
  Zoom,
  Mousewheel,
  EffectFade,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";
import "swiper/css/effect-fade";
import BookedSection from "@/components/Home_page/BookedSection/BookedSetion";

const CurtainsProduct = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const swiperRef = useRef(null);

  const openLightbox = (product) => {
    setSelectedProduct(product);
  };

  const closeLightbox = () => {
    setSelectedProduct(null);
  };

  // ✅ Double click zoom toggle
  const handleDoubleClick = () => {
    const swiper = swiperRef.current?.swiper;
    if (!swiper) return;
    const zoom = swiper.zoom;
    if (zoom.scale && zoom.scale > 1) {
      zoom.out();
    } else {
      zoom.in();
    }
  };

  // ✅ ESC key to close lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeLightbox();
      }
    };
    if (selectedProduct) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProduct]);

  return (
    <>
      <div className="container mx-auto">
        {/* 🖼 Product Slider */}
        <div className="w-full px-4 py-8">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 2 },
            }}
            className="mySwiper"
          >
            {products?.map((product) => (
              <SwiperSlide key={product._id}>
                <div
                  className="relative group w-full h-96 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => openLightbox(product)}
                >
                  <Image
                    src={product.images?.[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {product.images?.[1] && (
                    <Image
                      src={product.images[1]}
                      alt={`${product.name} hover`}
                      fill
                      className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Booked Section */}
        <div>
          <BookedSection />
        </div>

 
      </div>

      {/* 🔍 Lightbox Viewer */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onDoubleClick={handleDoubleClick}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-white hover:text-gray-300 transition"
          >
            <X size={32} />
          </button>

          {/* Swiper inside Lightbox */}
          <div className="relative w-[90vw] max-w-5xl h-[80vh]">
            <Swiper
              ref={swiperRef}
              modules={[
                Navigation,
                Pagination,
                Keyboard,
                Zoom,
                Mousewheel,
                EffectFade,
              ]}
              navigation
              pagination={{ clickable: true }}
              keyboard={{ enabled: true }}
              zoom={{ maxRatio: 3 }}
              mousewheel={{ forceToAxis: true, sensitivity: 1 }}
              effect="fade"
              className="h-full"
            >
              {selectedProduct.images.map((img, i) => (
                <SwiperSlide key={i}>
                  <div className="swiper-zoom-container flex items-center justify-center w-full h-full">
                    <Image
                      src={img}
                      alt={`Product image ${i + 1}`}
                      fill
                      className="object-contain rounded-xl select-none"
                      draggable={false}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default CurtainsProduct;

'use client';
import React from 'react';
import '../Home_page/Hero.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay, FreeMode } from 'swiper/modules';
import Link from 'next/link';
import Image from 'next/image';

import HeroImg1 from '../../public/hero-1.jpg';
import HeroImg2 from '../../public/hero-2.jpg';
import HeroImg3 from '../../public/hero-3.jpg';

const slidesData = [
  {
    id: 1,
    title: 'Perfect Cabinets For Your Kitchen.',
    subtitle: 'UP TO 50% OFF!',
    description: 'Transform your space with stylish, durable furniture designed for comfort, elegance, and lasting quality.',
    image: HeroImg1,
    link: '/shop',
  },
  {
    id: 2,
    title: 'Modern Designs, Great Comfort.',
    subtitle: 'LIMITED TIME OFFER!',
    description: 'Bring home furniture that matches your style while staying affordable and practical.',
    image: HeroImg2,
    link: '/shop',
  },
  {
    id: 3,
    title: 'Make Your Living Room Elegant.',
    subtitle: 'EXCLUSIVE DEAL!',
    description: 'Discover premium-quality furniture that enhances every corner of your home.',
    image: HeroImg3,
    link: '/shop',
  },
];

const Hero = () => {
  return (
    <div className="py-10 relative">
      <div className="container mx-auto">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, FreeMode]}
          navigation
          pagination={{ clickable: true }}
          loop
          freeMode={true}
          speed={5000} // higher speed for smooth continuous scroll
          autoplay={{
            delay: 0, // no delay between slides
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          className="mySwiper rounded-2xl overflow-hidden shadow-lg"
        >
          {slidesData.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative flex flex-col md:flex-row items-center justify-between h-[500px] md:h-[450px] xl:h-[545px] bg-[#edeae5] rounded-2xl overflow-hidden">
                
                {/* Image */}
                <div className="w-full md:w-[50%] lg:w-[45%] xl:w-[40%] relative h-[250px] md:h-full">
                  <Image 
                    src={slide.image} 
                    alt={slide.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
                </div>

                {/* Text Content */}
                <div className="w-full md:w-[45%] text-center md:text-left p-5 md:p-10 flex flex-col justify-center">
                  <span className="jost_font text-[16px] font-medium text-gray-700 uppercase tracking-wider">
                    {slide.subtitle}
                  </span>
                  <h2 className="jost_font text-[24px] md:text-[30px] xl:text-[44px] font-bold mt-3 leading-tight text-gray-900">
                    {slide.title}
                  </h2>
                  <p className="jost_font text-[16px] md:text-[18px] mt-2 text-gray-600">
                    {slide.description}
                  </p>
                  <Link 
                    href={slide.link} 
                    className="inline-block mt-6 px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition-colors duration-300"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;

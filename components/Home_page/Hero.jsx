'use client';
import React from 'react';
import '../Home_page/Hero.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
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
    description:
      'Transform your space with stylish, durable furniture designed for comfort, elegance, and lasting quality.',
    image: HeroImg1,
    link: '/',
  },
  {
    id: 2,
    title: 'Modern Designs, Great Comfort.',
    subtitle: 'LIMITED TIME OFFER!',
    description:
      'Bring home furniture that matches your style while staying affordable and practical.',
    image: HeroImg2,
    link: '/',
  },
  {
    id: 3,
    title: 'Make Your Living Room Elegant.',
    subtitle: 'EXCLUSIVE DEAL!',
    description:
      'Discover premium-quality furniture that enhances every corner of your home.',
    image: HeroImg3,
    link: '/',
  },
];

const Hero = () => {
  return (
    <div className="py-10">
      <div className="container">
        <Swiper
          cssMode={true}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper h-[600px]"
        >
          {slidesData.map((slide) => (
            <SwiperSlide
              key={slide.id}
              className="bg-[#edeae5] px-[100px] rounded-2xl"
            >
              <div className="flex items-center justify-between h-full">
                <div className="w-[40%]">
                  <span className="jost_font text-[17px] font-medium">
                    {slide.subtitle}
                  </span>
                  <h2 className="jost_font text-[44px] font-semibold mt-3 leading-[50px]">
                    {slide.title}
                  </h2>
                  <p className="jost_font text-[17px] font-normal mt-5">
                    {slide.description}
                  </p>
                  <Link
                    href={slide.link}
                    className="px-7 py-3 bg-black text-white inline-block text-[18px] mt-6"
                  >
                    Shop Now
                  </Link>
                </div>
                <div className="w-[47%]">
                  <Image src={slide.image} alt={slide.title} />
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

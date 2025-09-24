'use client'
import React from 'react'
import '../Home_page/Hero.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import Link from 'next/link';
import Image from 'next/image';
import HeroImg1 from "../../public/hero-1.jpg"
import HeroImg2 from "../../public/hero-2.jpg"
import HeroImg3 from "../../public/hero-3.jpg"


const Hero = () => {
  return (
    <>
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
                <SwiperSlide className=' bg-[#edeae5] px-[100px] rounded-2xl '>
                    <div className="flex items-center justify-between h-full">
                        <div className="w-[40%]">
                            <span className='jost_font text-[17px] font-medium'>UP TO 50% OFF! </span>
                            <h2 className='jost_font text-[44px] font-semibold mt-3 leading-[50px]'>Perfect  Cabinets For Your Kitchen.</h2>
                            <p className='jost_font text-[17px] font-normal mt-5'>Transform your space with stylish, durable furniture designed for comfort, elegance, and lasting quality.</p>
                            <Link href="" className='' >Shop Now</Link>
                        </div>
                        <div className="w-[47%]">
                            <div className="">
                                <Image src={HeroImg1} alt='HeroImg1'/>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className=' bg-[#edeae5] px-[100px] rounded-2xl '>
                    <div className="flex items-center justify-between h-full">
                        <div className="w-[40%]">
                            <span className='jost_font text-[17px] font-medium'>UP TO 50% OFF! </span>
                            <h2 className='jost_font text-[44px] font-semibold mt-3 leading-[50px]'>Perfect  Cabinets For Your Kitchen.</h2>
                            <p className='jost_font text-[17px] font-normal mt-5'>Transform your space with stylish, durable furniture designed for comfort, elegance, and lasting quality.</p>
                            <Link href="" className='' >Shop Now</Link>
                        </div>
                        <div className="w-[47%]">
                            <div className="">
                                <Image src={HeroImg2} alt='HeroImg1'/>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className=' bg-[#edeae5] px-[100px] rounded-2xl '>
                    <div className="flex items-center justify-between h-full">
                        <div className="w-[40%]">
                            <span className='jost_font text-[17px] font-medium'>UP TO 50% OFF! </span>
                            <h2 className='jost_font text-[44px] font-semibold mt-3 leading-[50px]'>Perfect  Cabinets For Your Kitchen.</h2>
                            <p className='jost_font text-[17px] font-normal mt-5'>Transform your space with stylish, durable furniture designed for comfort, elegance, and lasting quality.</p>
                            <Link href="" className='px-7 py-3 bg-black text-white inline-block text-[18px] mt-6' >Shop Now</Link>
                        </div>
                        <div className="w-[47%]">
                            <div className="">
                                <Image src={HeroImg3} className='' alt='HeroImg1'/>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                    
            </Swiper>
        </div>
    </div>
    </>
  )
}

export default Hero
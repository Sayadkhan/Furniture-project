"use client"
import Link from 'next/link'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import FeaturedImg1 from "../../public/featured/top-1.jpg"
import FeaturedImg2 from "../../public/featured/top-2.jpg"
import FeaturedImg3 from "../../public/featured/top-3.jpg"
import FeaturedImg4 from "../../public/featured/top-4.jpg"
import FeaturedImg5 from "../../public/featured/top-5.jpg"
import FeaturedImg6 from "../../public/featured/top-6.jpg"
import FeaturedImg7 from "../../public/featured/top-7.jpg"
import FeaturedImg8 from "../../public/featured/top-8.jpg"


const LatestProductData = [
    {
        images: FeaturedImg1,
        title: "SlumberCraft",
        name: "Bedroom Sets",
        price: "$250.00"
    },   
     {
        images: FeaturedImg2,
        title: "SlumberCraft",
        name: "Bedroom Sets",
        price: "$250.00"
    },   
     {
        images: FeaturedImg3,
        title: "SlumberCraft",
        name: "Bedroom Sets",
        price: "$250.00"
    }, 
     {
        images: FeaturedImg4,
        title: "SlumberCraft",
        name: "Bedroom Sets",
        price: "$250.00"
    }, 
     {
        images: FeaturedImg5,
        title: "SlumberCraft",
        name: "Bedroom Sets",
        price: "$250.00"
    }, 
     {
        images: FeaturedImg6,
        title: "SlumberCraft",
        name: "Bedroom Sets",
        price: "$250.00"
    }, 
     {
        images: FeaturedImg7,
        title: "SlumberCraft",
        name: "Bedroom Sets",
        price: "$250.00"
    }, 

     {
        images: FeaturedImg8,
        title: "SlumberCraft",
        name: "Bedroom Sets",
        price: "$250.00"
    }, 
     {
        images: FeaturedImg1,
        title: "SlumberCraft",
        name: "Bedroom Sets",
        price: "$250.00"
    }, 
     {
        images: FeaturedImg2,
        title: "SlumberCraft",
        name: "Bedroom Sets",
        price: "$250.00"
    }, 
     {
        images: FeaturedImg3,
        title: "SlumberCraft",
        name: "Bedroom Sets",
        price: "$250.00"
    }, 
]

const LatestProducts = () => {
  return (
    <div className='pb-[80px]'>
        <div className="container">
            <div className="">
                <h3 className='text-[35px] font-semibold text-black mb-5'>Latest products</h3>
            </div>
            <Swiper slidesPerView={4} spaceBetween={25} centeredSlides={true} pagination={{ clickable: true, }}
              className="mySwiper">
                {LatestProductData.map((item, index)=>(
                    <SwiperSlide>
                        <div key={index} className="w-full pb-4 shadow overflow-hidden rounded-lg group">
                            <Link href="">
                                <div className="w-full h-[250px] overflow-hidden">
                                    <Image className='w-full h-full object-cover group-hover:scale-[1.2] transition-all duration-300' src={item.images} alt=''/>
                                </div>
                                <div className="mt-3 pl-4">
                                    <h5 className='text-[16px] font-normal text-[#575757]'>{item.title}</h5>
                                    <h3 className='text-[20px] font-medium'>{item.name}</h3>
                                    <span className='text-[16px] font-medium mt-1 block'>{item.price}</span>
                                </div>
                            </Link>
                        </div> 
                    </SwiperSlide>             
                ))}
            </Swiper>
        </div>
    </div>
  )
}

export default LatestProducts
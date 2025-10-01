"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';
import Image from 'next/image';

const SliderProduct = ({products}) => {

  

  return ( 
        <Swiper
          modules={[Pagination]}
          slidesPerView={4}
          spaceBetween={25}
          pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 1 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          className="mySwiper"
        >
          {products.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="w-full pb-4 shadow overflow-hidden rounded-lg group">
                <Link href="">
                  <div className="w-full h-[250px] overflow-hidden">
                    <Image
                      className='w-full h-full object-cover group-hover:scale-[1.2] transition-all duration-300'
                      src={item.images[0]}
                      width={400}
                      height={400}
                      alt={item.name}
                    />
                  </div>
                  <div className="mt-3 pl-4">
                    {/* <h5 className='text-[16px] font-normal text-[#575757]'>{item.title}</h5> */}
                    <h3 className='text-[20px] font-medium'>{item.name}</h3>
                    <span className='text-[16px] font-medium mt-1 block'>{item.price}</span>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

  )
}

export default SliderProduct

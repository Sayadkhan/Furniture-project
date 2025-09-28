import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import FeaturedImg1 from "../../public/featured/top-1.jpg"
import FeaturedImg2 from "../../public/featured/top-2.jpg"
import FeaturedImg3 from "../../public/featured/top-3.jpg"
import FeaturedImg4 from "../../public/featured/top-4.jpg"
import FeaturedImg5 from "../../public/featured/top-5.jpg"
import FeaturedImg6 from "../../public/featured/top-6.jpg"
import FeaturedImg7 from "../../public/featured/top-7.jpg"
import FeaturedImg8 from "../../public/featured/top-8.jpg"


const featuredData = [
    {
        images: FeaturedImg1,
        name: "Bedroom Sets",
        persent: "Upto 70% off"
    },
     {
        images: FeaturedImg2,
        name: "Bedroom Sets",
        persent: "Upto 70% off"
    },
     {
        images: FeaturedImg3,
        name: "Bedroom Sets",
        persent: "Upto 70% off"
    },
     {
        images: FeaturedImg4,
        name: "Bedroom Sets",
        persent: "Upto 70% off"
    },
    {
        images: FeaturedImg5,
        name: "Bedroom Sets",
        persent: "Upto 70% off"
    },
    {
        images: FeaturedImg6,
        name: "Bedroom Sets",
        persent: "Upto 70% off"
    },
    {
        images: FeaturedImg7,
        name: "Bedroom Sets",
        persent: "Upto 70% off"
    },
    {
        images: FeaturedImg8,
        name: "Bedroom Sets",
        persent: "Upto 70% off"
    },

]

const TopPicks = () => {
  return (
    <div className='pb-[50px] lg:pb-[100px]'>
        <div className="container">
            <h3 className='text-[35px] font-semibold text-black mb-5'>Top Picks</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {featuredData.map((item, index)=>(
                        <div key={index} className="w-full pb-4 shadow overflow-hidden rounded-lg group">
                            <Link href="">
                                <div className="w-full h-[250px] overflow-hidden">
                                    <Image className='w-full h-full object-cover group-hover:scale-[1.2] transition-all duration-300' src={item.images} alt=''/>
                                </div>
                                <div className="mt-3 pl-4">
                                    <h3 className='text-[24px] font-medium'>Bedroom SetS</h3>
                                    <span className='text-[20px] font-medium mt-1 block'>Upto 70% off</span>
                                </div>
                            </Link>
                        </div>            
                    ))}
            </div>
        </div>
    </div>
  )
}

export default TopPicks
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import iconImg1 from "../../public/catacoryIconImg/cat1.svg"
import iconImg2 from "../../public/catacoryIconImg/cat2.svg"
import iconImg3 from "../../public/catacoryIconImg/cat3.svg"
import iconImg4 from "../../public/catacoryIconImg/cat4.svg"
import iconImg5 from "../../public/catacoryIconImg/cat5.svg"
import iconImg6 from "../../public/catacoryIconImg/cat6.svg"
import iconImg7 from "../../public/catacoryIconImg/cat7.svg"
import iconImg8 from "../../public/catacoryIconImg/cat8.svg"
import iconImg9 from "../../public/catacoryIconImg/cat9.svg"


const categoryIconData = [
    {
        image: iconImg1,
        name: "Tables",
    },
    {
        image: iconImg2,
        name: "Tables",
    },
    {
        image: iconImg3,
        name: "Tables",
    },
    {
        image: iconImg4,
        name: "Tables",
    },
    {
        image: iconImg5,
        name: "Tables",
    },
    {
        image: iconImg6,
        name: "Tables",
    },
    {
        image: iconImg7,
        name: "Tables",
    },
    {
        image: iconImg8,
        name: "Tables",
    },
    {
        image: iconImg9,
        name: "Tables",
    },
]

const CategoryIcons = () => {
  return (
    <div className='py-[20px] xl:py-[60px]'>
        <div className="container">
            <div className="w-full xl:w-[80%] m-auto">
                <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-9 gap-[30px]">
                    {categoryIconData.map((item,index)=>(
                        <div key={index} className="flex justify-center items-center">
                            <Link href="">
                                <Image src={item.image} alt='' />
                                <h5 className='text-[17px] font-medium text-center mt-4'>{item.name}</h5>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default CategoryIcons
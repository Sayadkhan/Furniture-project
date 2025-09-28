"use client"
import Image from 'next/image'
import Link from 'next/link'
import popularBrand1 from "../../public/PopularBrands/brand-f1.jpg"
import popularBrand2 from "../../public/PopularBrands/brand-f2.jpg"
import popularBrand3 from "../../public/PopularBrands/brand-f3.jpg"
import popularBrand4 from "../../public/PopularBrands/brand-f4.jpg"
import popularBrand5 from "../../public/PopularBrands/brand-f5.jpg"
import popularBrand6 from "../../public/PopularBrands/brand-f6.jpg"
import popularBrand7 from "../../public/PopularBrands/brand-f7.jpg"
import popularBrand8 from "../../public/PopularBrands/brand-f8.jpg"
import popularBrand9 from "../../public/PopularBrands/brand-f9.jpg"
import popularBrand10 from "../../public/PopularBrands/brand-f10.jpg"



const LatestProductData = [
    {
        images: popularBrand1,       
        name: "Cherry Furniture",
        discount: "15-20% OFF"
    },   
    {
        images: popularBrand2,       
        name: "Cherry Furniture",
        discount: "15-20% OFF"
    },   
     {
        images: popularBrand3,       
        name: "Cherry Furniture",
        discount: "15-20% OFF"
    },   
     {
        images: popularBrand4,       
        name: "Cherry Furniture",
        discount: "15-20% OFF"
    },   
     {
        images: popularBrand5,       
        name: "Cherry Furniture",
        discount: "15-20% OFF"
    },   
     {
        images: popularBrand6,       
        name: "Cherry Furniture",
        discount: "15-20% OFF"
    },   
     {
        images: popularBrand7,       
        name: "Cherry Furniture",
        discount: "15-20% OFF"
    },   
     {
        images: popularBrand8,       
        name: "Cherry Furniture",
        discount: "15-20% OFF"
    },  
     {
        images: popularBrand9,       
        name: "Cherry Furniture",
        discount: "15-20% OFF"
    },  
     {
        images: popularBrand10,       
        name: "Cherry Furniture",
        discount: "15-20% OFF"
    },  
     
]

const PopularBrands = () => {
  return (
    <div className='pb-[100px]'>
        <div className="container">
            <div className="">
                <h3 className='text-[35px] font-semibold text-black mb-5'>Popular Brands</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-[20px]">
                {LatestProductData.map((Item, index)=>(
                    <div key={index} className="p-[10px] shadow rounded-xl group">
                        <div className="w-full h-[200px] overflow-hidden rounded-lg">
                            <Image className='w-full h-full object-cover group-hover:scale-[1.2] transition-all duration-300' src={Item.images} alt=''/>
                        </div>
                        <div className="text-center mt-5">
                            <span className='text-[15px] font-normal'>{Item.name}</span>
                            <h4 className='text-[22px] font-semibold mt-2'>{Item.discount}</h4>
                            <Link className='text-[15px] font-medium px-6 py-3 bg-black text-white block mt-3 rounded-lg' href="">Shop Now</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default PopularBrands
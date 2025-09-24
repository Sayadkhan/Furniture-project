"use client"
import Image from "next/image"
import FeaturedImg1 from "../../public/f-1.webp"
import FeaturedImg2 from "../../public/f-2.webp"
import FeaturedImg3 from "../../public/f-4.jpg"

const Featured = () => {
  return (
    <div className="pt-[40px] pb-[100px]">
        <div className="container">
            <h2 className="text-[35px] font-semibold mb-5">Featured offers</h2>
            <div className="flex justify-between">
                <div className="w-[32.5%] h-[320px] overflow-hidden rounded-lg relative">
                    <Image className="w-full h-full object-cover" src={FeaturedImg1} alt="FeaturedImg1"/>
                    <div className="w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] flex flex-col justify-center px-12">
                        <span></span>
                        <h3 className="text-[30px] font-semibold text-white leading-[35px]">Make  Your Home a Masterpiece</h3>
                        <p className="text-[20px] font-normal text-white mt-4">Discover Unique Finds!</p>
                    </div>
                </div>
                <div className="w-[32.5%] h-[320px] overflow-hidden rounded-lg relative">
                    <Image className="w-full h-full object-cover" src={FeaturedImg2} alt="FeaturedImg1"/>
                    <div className="w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] flex flex-col justify-center px-12">
                        <span></span>
                        <h3 className="text-[30px] font-semibold text-white leading-[35px]">Make  Your Home a Masterpiece</h3>
                        <p className="text-[20px] font-normal text-white mt-4">Discover Unique Finds!</p>
                    </div>
                </div>
                <div className="w-[32.5%] h-[320px] overflow-hidden rounded-lg relative">
                    <Image className="w-full h-full object-cover" src={FeaturedImg3} alt="FeaturedImg1"/>
                    <div className="w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] flex flex-col justify-center px-12">
                        <span></span>
                        <h3 className="text-[30px] font-semibold text-white leading-[35px]">Make  Your Home a Masterpiece</h3>
                        <p className="text-[20px] font-normal text-white mt-4">Discover Unique Finds!</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Featured
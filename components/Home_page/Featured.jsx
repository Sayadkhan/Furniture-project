"use client"
import Image from "next/image"
import FeaturedImg1 from "../../public/f-1.webp"
import FeaturedImg2 from "../../public/f-2.webp"
import FeaturedImg3 from "../../public/f-4.jpg"

const Featured = () => {
  return (
    <div className="pt-[40px] pb-[80px] md:pb-[100px]">
      <div className="container mx-auto px-4">
        <h2 className="text-[26px] sm:text-[30px] md:text-[35px] font-semibold mb-6 text-center md:text-left"> Featured Offers </h2> 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">     
          <div className="w-full h-[220px] sm:h-[280px] md:h-[320px] overflow-hidden rounded-lg relative">
            <Image className="w-full h-full object-cover" src={FeaturedImg1} alt="FeaturedImg1"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex flex-col justify-center px-6 sm:px-8 md:px-12">
              <h3 className="text-[20px] sm:text-[24px] md:text-[30px] font-semibold text-white leading-[28px] sm:leading-[32px] md:leading-[36px]">
                Make Your Home a Masterpiece</h3>
              <p className="text-[14px] sm:text-[16px] md:text-[20px] font-normal text-white mt-3"> Discover Unique Finds! </p>
            </div>
          </div>        
          <div className="w-full h-[220px] sm:h-[280px] md:h-[320px] overflow-hidden rounded-lg relative">
            <Image className="w-full h-full object-cover" src={FeaturedImg2} alt="FeaturedImg2" />
            <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex flex-col justify-center px-6 sm:px-8 md:px-12">
              <h3 className="text-[20px] sm:text-[24px] md:text-[30px] font-semibold text-white leading-[28px] sm:leading-[32px] md:leading-[36px]">
                Make Your Home a Masterpiece
              </h3>
              <p className="text-[14px] sm:text-[16px] md:text-[20px] font-normal text-white mt-3"> Discover Unique Finds! </p>
            </div>
          </div>
          <div className="w-full h-[220px] sm:h-[280px] md:h-[320px] overflow-hidden rounded-lg relative">
            <Image className="w-full h-full object-cover" src={FeaturedImg3} alt="FeaturedImg3"/>
            <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex flex-col justify-center px-6 sm:px-8 md:px-12">
              <h3 className="text-[20px] sm:text-[24px] md:text-[30px] font-semibold text-white leading-[28px] sm:leading-[32px] md:leading-[36px]">
                Make Your Home a Masterpiece
              </h3>
              <p className="text-[14px] sm:text-[16px] md:text-[20px] font-normal text-white mt-3">
                Discover Unique Finds!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Featured
"use client"
import Image from 'next/image'
import Badroom from "../../public/badroom.jpg"
import Link from 'next/link'


const BedRoomsection = () => {
  return (
    <div className='pb-[100px]'>
        <div className="container">
            <div className="w-full h-[550px] relative rounded-xl overflow-hidden">
                <Image className='w-full h-full object-cover' src={Badroom} alt='' />
                <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.8)] flex flex-col justify-center px-[100px] items-center">
                    <div className="text-center">
                        <span className='text-[18px] font-normal text-white'>UP TO 50% OFF</span>
                        <h2 className='text-[40px] font-bold text-white w-[700px] leading-[60px] my-5 m-auto'>As Cozy As Your Bedroom – Dining Tables at Discount</h2>
                        <p className='text-[18px] font-medium text-white w-[550px] m-auto'>Get the perfect cabinet for your bedroom room with huge savings. Limited-time offer. Grab yours today!</p>
                        <Link className='text-[20px] text-white px-7 py-3 bg-[#000] rounded-[5px] inline-block mt-8' href="">Shop Now</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BedRoomsection
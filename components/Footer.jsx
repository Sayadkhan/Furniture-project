import Link from 'next/link';
import React from 'react'
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import SubFooter from './SubFooter';

const Footer = () => {
  return (
    <>     
      <footer className='py-14 bg-[#1a1a1a]'>
        <div className="container">
          <div className="flex justify-between pb-18 border-b border-[#444]">
            <div className="w-[25%] text-white">
              <Link href="" className='jost_font text-[25px]'>Furniture</Link>
              <div className="flex gap-2 jost_font mt-5">
                <IoLocationOutline  className='text-[25px]'/>
                <span className='jost_font w-[300px]'>99 New Theme St. XY, USA 12345, Beside the Sun point land.</span>
              </div>
              <div className="flex gap-2 jost_font mt-5">               
                <AiOutlineMail  className='text-[20px]'/>
                <span className='jost_font'>demo@example.com</span>
              </div> 
              <Link href="" className='jost_font text-[18px] font-semibold text-white mt-4 block'>+00 123-456-789</Link>             
            </div>
            <div className="w-[15%]">
              <h3 className='text-white text-[20px] mb-4'>Get to know Us</h3>
              <ul className='text-white'>
                <li className=''><Link href="">About Us</Link></li>
                <li className='mt-3'><Link href="">Term & Policy</Link></li>
                <li className='mt-3'><Link href="">Careers</Link></li>
                <li className='mt-3'><Link href="">News & Blog</Link></li>
                <li className='mt-3'><Link href="">Contact Us</Link></li>
              </ul>
            </div>
            <div className="w-[15%]">
              <h3 className='text-white text-[20px] mb-4'>Information</h3>
              <ul className='text-white'>
                <li className=''><Link href="">Help Center</Link></li>
                <li className='mt-3'><Link href="">Feedback</Link></li>
                <li className='mt-3'><Link href="">FAQs</Link></li>
                <li className='mt-3'><Link href="">Size Guide</Link></li>
                <li className='mt-3'><Link href="">Payments</Link></li>
              </ul>
            </div>
            <div className="w-[15%]">
              <h3 className='text-white text-[20px] mb-4'>Orders & Returns</h3>
              <ul className='text-white'>
                <li className=''><Link href="">Track Order</Link></li>
                <li className='mt-3'><Link href="">Delivery</Link></li>
                <li className='mt-3'><Link href="">Services</Link></li>
                <li className='mt-3'><Link href="">Returns</Link></li>
                <li className='mt-3'><Link href="">Exchange</Link></li>
              </ul>
            </div>
            <div className="w-[20%]">
              <h3 className='text-white text-[20px] mb-4'>Get Download Apps</h3>
              <p className='text-[15px] text-white'>Enjoy 15% discount on your first furniture purchase, bringing comfort, elegance, and style home</p>
            </div>
          </div>
          <SubFooter />
        </div>
      </footer>
    </>
    
  )
}

export default Footer
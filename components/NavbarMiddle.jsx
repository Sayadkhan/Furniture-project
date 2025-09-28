"use client"
import Link from 'next/link';
import React, { useState } from 'react'
import { FaFacebookF, FaXTwitter, FaInstagram, FaPinterestP, FaUser, FaHeart, FaShoppingCart, } from 'react-icons/fa6';
import { PiShoppingCart } from "react-icons/pi";
import CartModal from './Add_To_Cart/CartModal';

const NavbarMiddle = () => {

  const [openCart, setOpenCart] = useState(false)

  const openCartModal = () => {
    setOpenCart(!openCart)
  }
  return (
    <div className="bg-[#000] text-white py-4 px-6">
          <div className="container">
            <div className=" flex items-center justify-between">        
              <div className="flex gap-4 text-lg">
                <FaFacebookF className="hover:text-gray-400 cursor-pointer" />
                <FaXTwitter className="hover:text-gray-400 cursor-pointer" />
                <FaInstagram className="hover:text-gray-400 cursor-pointer" />
                <FaPinterestP className="hover:text-gray-400 cursor-pointer" />
              </div>
    
          
              <div className="text-2xl font-bold tracking-wide cursor-pointer">
                <Link href="/">United furniture UAE</Link>                
              </div>
    
              {/* Right: User, Wishlist, Cart */}
              <div className="flex items-center gap-6 text-sm">
                {/* User */}
                <FaUser className="text-lg hover:text-gray-400 cursor-pointer" />
    
                {/* Wishlist */}
                <div className="relative flex items-center gap-1 hover:text-gray-400 cursor-pointer">
                  <FaHeart className="text-lg" />
                  <span className="text-xs absolute -top-2 -right-2 bg-white text-black rounded-full px-[5px] py-[1px] text-[10px]">
                    0
                  </span>
                </div>
    
                {/* Cart */}
              <button onClick={openCartModal}>
                    <div className="relative flex items-center gap-1 hover:text-gray-400 cursor-pointer">
                    <PiShoppingCart className="text-lg"/>             
                    <span className="text-xs absolute -top-2 -right-2 bg-white text-black rounded-full px-[5px] py-[1px] text-[10px]">
                      0
                    </span>
                    <span className="ml-1">$0.00</span>
                  </div>
              </button>
              </div>
            </div>
          </div>

          <CartModal openCart={openCart} setOpenCart={setOpenCart}/>
        </div>
  )
}

export default NavbarMiddle
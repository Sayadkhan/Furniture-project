"use client"
import { FaSearch } from 'react-icons/fa';

import { FaBars } from 'react-icons/fa'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className="bg-[#000] text-white py-4 px-6">
      <div className="container">
        <div className="bg-gray-100 px-3 py-3 flex items-center justify-between text-sm">
          {/* ----------------------Navigation-Menu---------- */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="flex items-center gap-2 text-gray-700">
                  <FaBars className="text-[20px]" />
                  <span className="jost_font text-[15px]">Shop By Categories</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-4 w-[250px]">
                  <ul className="flex flex-col gap-2 w-[300px]">
                    <li>
                      <NavigationMenuLink className="hover:bg-gray-200 block px-3 py-1 rounded-md text-gray-700">
                        Electronics
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink className="hover:bg-gray-200 block px-3 py-2 rounded-md text-gray-700">
                        Fashion
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink className="hover:bg-gray-200 block px-3 py-2 rounded-md text-gray-700">
                        Home & Kitchen
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink className="hover:bg-gray-200 block px-3 py-2 rounded-md text-gray-700">
                        Sports
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink className="hover:bg-gray-200 block px-3 py-2 rounded-md text-gray-700">
                        Books
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          {/* -------middle-menu--------- */}
          <div className="text-black flex gap-[35px]">
            <Link className='text-[18px] font-medium' href="/">Home</Link>
            <Link className='text-[18px] font-medium' href="/shop">Shop</Link>
            <Link className='text-[18px] font-medium' href="">About</Link>
            <Link className='text-[18px] font-medium' href="">Contact</Link>
          </div>
          {/* -------------search-bar-------- */}
          <div className="border border-[#e4e4e4] rounded-md p-3 flex items-center w-full max-w-[350px]">
            <input
              type="text"
              placeholder="Search products..."
              className="flex-grow outline-none bg-transparent placeholder-[#000] text-black"
            />
            <FaSearch className="text-black ml-2" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar

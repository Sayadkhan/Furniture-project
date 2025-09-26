"use client"

import { FaBars } from 'react-icons/fa'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const Navbar = () => {
  return (
    <div className="bg-[#000] text-white py-4 px-6">
      <div className="container">
        <div className="bg-gray-100 py-3 px-6 flex items-center justify-between text-sm">
          {/* Navigation Menu */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="flex items-center gap-2 text-gray-700">
                  <FaBars className="text-[20px]" />
                  <span className="jost_font text-[15px]">Shop By Categories</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-4 w-[250px]">
                  <ul className="flex flex-col gap-2">
                    <li>
                      <NavigationMenuLink className="hover:bg-gray-200 block px-3 py-2 rounded-md text-gray-700">
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
        </div>
      </div>
    </div>
  )
}

export default Navbar

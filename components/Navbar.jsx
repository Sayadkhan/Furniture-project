"use client"
import { FaBars, FaSearch } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div className="bg-[#000] text-white py-4 px-6">
      <div className="container">
       <div className="bg-gray-100 py-3 px-6 flex items-center justify-between text-sm">
      <div className="flex items-center gap-2 cursor-pointer text-gray-700">
          <FaBars className='text-[20px]' />
          <span className='jost_font text-[15px]'>Shop By Categories</span>
        </div>
       
        </div>
      </div>
    </div>
  )
}

export default Navbar
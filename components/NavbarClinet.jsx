"use client";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toggleCategory, toggleChildCategory, toggleSubCategory } from "@/redux/slice/filterSlice";

const NavbarClient = ({ categories }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleCategoryClick = (id) => {
    dispatch(toggleCategory(id));
    router.push("/shop"); 
  };

  const handleSubCategoryClick = (id) => {
    dispatch(toggleSubCategory(id));
    router.push("/shop");
  };

  const handleChildCategoryClick = (id) => {
    dispatch(toggleChildCategory(id));
    router.push("/shop");
  };

  return (
    <div className=" text-white px-0 sticky top-0 z-[5000] shadow-md">
      <div className="">
        <div className="bg-gray-100 px-3 py-3 flex items-center justify-center text-sm">
          <div className="text-black hidden xl:flex gap-[35px]">
            {categories.slice(0, 5).map((cat) => (
              <div key={cat._id} className="relative group">
                <button
                  onClick={() => handleCategoryClick(cat._id)}
                  className="text-[18px] font-medium"
                >
                  {cat.name}
                </button>

                {/* Subcategory Mega Menu */}
                {cat.subcategories.length > 0 && (
                  <div className="absolute top-full left-0 mt-2 w-[700px] bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 p-6">
                    <div className="grid grid-cols-3 gap-6">
                      {cat.subcategories.map((sub) => (
                        <div key={sub._id}>
                          <h4
                            className="text-gray-900 font-bold mb-2 cursor-pointer"
                            onClick={() => handleSubCategoryClick(sub._id)}
                          >
                            {sub.name}
                          </h4>

                          <ul className="space-y-1">
                            {sub.childcategories?.map((child) => (
                              <li key={child._id}>
                                <button
                                  onClick={() => handleChildCategoryClick(child._id)}
                                  className="text-gray-600 hover:text-black text-sm"
                                >
                                  {child.name}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}

                    </div>
                  </div>
                )}
              </div>
            ))}

            
          <Link href={"/shop"} className="underline">
              More
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarClient;

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
    <div className="sticky top-0 z-30 shadow-md bg-gray-100">
      <div className="px-3 py-3 flex items-center justify-center text-sm">
        <div className="hidden xl:flex gap-8 text-black">
          {categories.slice(0, 5).map((cat) => (
            <div key={cat._id} className="relative group cursor-pointer">
              <button
                onClick={() => handleCategoryClick(cat._id)}
                className="text-[18px] font-medium hover:text-gray-800 transition cursor-pointer"
              >
                {cat.name}
              </button>

              {/* Subcategory Mega Menu */}
              {cat.subcategories.length > 0 && (
                <div className="absolute top-full left-0 mt-2 w-[700px] bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 p-6">
                  <div className="grid grid-cols-3 gap-6">
                    {cat.subcategories.slice(0, 4).map((sub) => (
                      <div key={sub._id}>
                        <h4
                          className="text-gray-900 font-bold mb-2 cursor-pointer hover:text-gray-700 transition"
                          onClick={() => handleSubCategoryClick(sub._id)}
                        >
                          {sub.name}
                        </h4>

                        <ul className="space-y-1">
                          {sub.childcategories?.slice(0, 5).map((child) => (
                            <li key={child._id}>
                              <button
                                onClick={() => handleChildCategoryClick(child._id)}
                                className="text-gray-600 hover:text-black text-sm cursor-pointer transition"
                              >
                                {child.name}
                              </button>
                            </li>
                          ))}
                          {sub.childcategories?.length > 5 && (
                            <li>
                              <Link
                                href="/shop"
                                className="text-blue-600 text-sm hover:underline"
                              >
                                More
                              </Link>
                            </li>
                          )}
                        </ul>
                      </div>
                    ))}

                    {/* More Categories Button */}
                    <div className="flex items-center justify-center col-span-1">
                      <Link
                        href="/shop"
                        className="px-4 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
                      >
                        More
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* General More Link */}
          <Link
            href="/shop"
            className="text-[18px] font-medium hover:text-gray-800 transition cursor-pointer text-blue-600 underline"
          >
            More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavbarClient;

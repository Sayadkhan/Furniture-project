"use client";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  toggleCategory,
  toggleChildCategory,
  toggleSubCategory,
} from "@/redux/slice/filterSlice";

const NavbarClient = ({ categories, curtains }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubCategoryClick = (id) => {
    dispatch(toggleSubCategory(id));
    router.push("/shop");
  };

  return (
    <div className="sticky top-0 z-30 shadow-md bg-[#f5f2ee]">
      <div className="px-3 py-3 flex items-center justify-center text-sm">
        <div className="hidden xl:flex gap-8 text-black items-center">

          {/* 🪟 Curtains Section (dropdown like screenshot) */}
          {curtains && (
            <div className="relative group cursor-pointer">
            <Link href={`/curtains`}>
              <button className="text-[18px] font-medium hover:text-gray-800 transition cursor-pointer capitalize flex items-center gap-1">
                {curtains.name || "Curtains"}
                <span className="text-sm">&#9662;</span> {/* ▼ icon */}
              </button>
              </Link>

              {/* Dropdown menu */}
              {curtains.subcategories?.length > 0 && (
                <div className="absolute top-full left-0 mt-2 w-[250px] bg-[#6b3e2e] text-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <ul className="py-2">
                    {curtains.subcategories.map((sub) => (
                      <li key={sub._id}>
                    <Link href={`/curtains/${sub._id}`}>
                        <button
                          // onClick={() => handleSubCategoryClick(sub._id)}
                          className="w-full text-left px-4 py-2 text-[15px] hover:bg-[#8b5a3d] transition-colors capitalize"
                        >
                          {sub.name}
                        </button>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* 🔹 Other Categories */}
          {categories?.slice(0, 5).map((cat) => (
            <Link
              key={cat._id}
              href="/shop"
              onClick={() => router.push("/shop")}
              className="text-[18px] font-medium hover:text-gray-800 transition cursor-pointer capitalize"
            >
              {cat.name}
            </Link>
          ))}

          {/* 🛒 General More Button */}
          <Link
            href="/shop"
            className="text-[18px] font-medium hover:text-gray-800 transition cursor-pointer text-[#8b5a3d] underline"
          >
            More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavbarClient;

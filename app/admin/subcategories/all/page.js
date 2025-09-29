import AllsubcategoryTable from "@/components/Admin/Subcategory/AllsubcategoryTable";
import { connectDB } from "@/lib/mongodb";
import SubCategory from "@/model/SubCategory";
import Category from "@/model/Category";
import React from "react";

async function getAllCategory() {
  await connectDB();
  const categories = await SubCategory.find({})
    .populate("category", "name")
    .sort({ createdAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify(categories));
}

const page = async () => {
  const category = await getAllCategory();

  return (
    <div>
      <AllsubcategoryTable subcategories={category} />
    </div>
  );
};

export default page;

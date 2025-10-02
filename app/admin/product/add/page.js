import { Suspense } from "react";
import AddProductForm from "./AddProductForm";
import { connectDB } from "@/lib/mongodb";
import Category from "@/model/Category";
import SubCategory from "@/model/SubCategory";

async function getAllCategoryWithSub() {
  await connectDB();

  const categories = await Category.find({}).sort({ createdAt: -1 }).lean();

  // fetch subcategories for each category
  const categoriesWithSub = await Promise.all(
    categories.map(async (cat) => {
      const subcategories = await SubCategory.find({
        category: cat._id,
      }).lean();
      return { ...cat, subcategories };
    })
  );

  return JSON.parse(JSON.stringify(categoriesWithSub));
}

export default async function AddProductPage() {
  const categoriesWithSub = await getAllCategoryWithSub();

  return (
    <div className="p-6">
      <Suspense fallback={<p>Loading form...</p>}>
        <AddProductForm categories={categoriesWithSub} />
      </Suspense>
    </div>
  );
}

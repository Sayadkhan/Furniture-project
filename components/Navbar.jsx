

import { connectDB } from '@/lib/mongodb';
import Category from '@/model/Category';
import ChildCategory from '@/model/ChildCategory';
import SubCategory from '@/model/SubCategory';
import Link from 'next/link'
import NavbarClinet from './NavbarClinet';
import { Suspense } from 'react';


async function getAllCategoryWithSub() {
  await connectDB();

  const categories = await Category.find({top_category:true}).sort({ createdAt: -1 }).lean();
  const categoriesWithSubAndChild = await Promise.all(
    categories.map(async (cat) => {
      const subcategories = await SubCategory.find({
        category: cat._id,
      }).lean();

      // attach child categories to each subcategory
      const subcategoriesWithChild = await Promise.all(
        subcategories.map(async (sub) => {
          const childcategories = await ChildCategory.find({
            subcategory: sub._id,
          }).lean();
          return { ...sub, childcategories };
        })
      );

      return { ...cat, subcategories: subcategoriesWithChild };
    })
  );

  return JSON.parse(JSON.stringify(categoriesWithSubAndChild));
}


export const dynamic = 'force-dynamic';


const Navbar = async () => {
  const categories = await getAllCategoryWithSub();




  return (
<Suspense>
      <NavbarClinet categories={categories}/>
</Suspense>
  );
};

export default Navbar;

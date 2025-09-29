

import { connectDB } from '@/lib/mongodb';
import Category from '@/model/Category';
import SubCategory from '@/model/SubCategory';
import Link from 'next/link'


async function getAllCategoryWithSub() {
  await connectDB();

  const categories = await Category.find({})
    .sort({ createdAt: -1 })
    .lean();

  // fetch subcategories for each category
  const categoriesWithSub = await Promise.all(
    categories.map(async (cat) => {
      const subcategories = await SubCategory.find({ category: cat._id }).lean();
      return { ...cat, subcategories };
    })
  );

  return JSON.parse(JSON.stringify(categoriesWithSub));
}

const Navbar = async () => {
  const categories = await getAllCategoryWithSub();

  return (
    <div className="bg-[#000] text-white py-4 px-0 lg:px-6">
      <div className="container">
        <div className="bg-gray-100 px-3 py-3 flex items-center justify-center text-sm">
          {/* -------middle-menu--------- */}
          <div className="text-black hidden xl:flex gap-[35px]">
            {categories.map((cat) => (
              <div key={cat._id} className="relative group">
                <Link
                  href={`/categories/${cat._id}`}
                  className="text-[18px] font-medium"
                >
                  {cat.name}
                </Link>

                {/* Subcategory Mega Menu */}
                {cat.subcategories.length > 0 && (
                  <div className="absolute top-full left-0 mt-2 w-[600px] bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 p-6">
                    <div className="grid grid-cols-3 gap-6">
                      {cat.subcategories.map((sub) => (
                        <Link
                          key={sub._id}
                          href={`/subcategories/${sub._id}`}
                          className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-lg"
                        >
                          {/* optional image */}
                          {sub.image && (
                            <img
                              src={sub.image}
                              alt={sub.name}
                              className="w-12 h-12 object-cover rounded-md"
                            />
                          )}
                          <div>
                            <h4 className="text-gray-800 font-medium">
                              {sub.name}
                            </h4>
                            {sub.desc && (
                              <p className="text-sm text-gray-500 line-clamp-2">
                                {sub.desc}
                              </p>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

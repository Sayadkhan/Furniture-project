"use client";
import { useSelector, useDispatch } from "react-redux";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input"; // ✅ Add Input from your UI
import ShopCard from "./ShopCard";
import {
  clearFilters,
  toggleCategory,
  toggleSubCategory,
  toggleChildCategory,
} from "@/redux/slice/filterSlice";
import { ChevronDown, ChevronRight, X } from "lucide-react";

export default function ShopClient({ products, categories, subCategories, childCategories }) {
  const { categoryIds, subCategoryIds, childCategoryIds } = useSelector(
    (state) => state.filters
  );
  const dispatch = useDispatch();

  const [openSections, setOpenSections] = useState({
    categories: true,
    subCategories: true,
    childCategories: true,
  });
  const [allOpen, setAllOpen] = useState(true);
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  // ✅ Search states
  const [searchCat, setSearchCat] = useState("");
  const [searchSub, setSearchSub] = useState("");
  const [searchChild, setSearchChild] = useState("");

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleAll = () => {
    const newState = !allOpen;
    setOpenSections({
      categories: newState,
      subCategories: newState,
      childCategories: newState,
    });
    setAllOpen(newState);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory =
        categoryIds.length === 0 || categoryIds.includes(product.category._id);
      const matchSubCategory =
        subCategoryIds.length === 0 || subCategoryIds.includes(product.subcategory._id);
      const matchChildCategory =
        childCategoryIds.length === 0 ||
        (product.childcategory && childCategoryIds.includes(product.childcategory._id));
      return matchCategory && matchSubCategory && matchChildCategory;
    });
  }, [products, categoryIds, subCategoryIds, childCategoryIds]);

  // ✅ Filtering logic for searches
  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchCat.toLowerCase())
  );
  const filteredSubCategories = subCategories.filter((s) =>
    s.name.toLowerCase().includes(searchSub.toLowerCase())
  );
  const filteredChildCategories = childCategories.filter((ch) =>
    ch.name.toLowerCase().includes(searchChild.toLowerCase())
  );

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="flex flex-col gap-3">
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
          onClick={() => dispatch(clearFilters())}
        >
          Show All Products
        </Button>
        <Button
          variant="outline"
          className="w-full border-gray-300 text-gray-700 hover:bg-gray-100"
          onClick={toggleAll}
        >
          {allOpen ? "Collapse All" : "Expand All"}
        </Button>
      </div>

      {/* Categories */}
      <Card className="border border-gray-200 shadow-sm rounded-xl">
        <CardHeader
          className="flex items-center justify-between cursor-pointer py-2"
          onClick={() => toggleSection("categories")}
        >
          <CardTitle className="text-base font-semibold">
            Categories{" "}
            {categoryIds.length > 0 && (
              <span className="ml-2 text-xs px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full">
                {categoryIds.length}
              </span>
            )}
          </CardTitle>
          {openSections.categories ? (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-500" />
          )}
        </CardHeader>
        {openSections.categories && (
          <CardContent className="space-y-3">
            <Input
              placeholder="Search categories..."
              value={searchCat}
              onChange={(e) => setSearchCat(e.target.value)}
              className="text-sm"
            />
            <div className="max-h-48 overflow-y-auto divide-y">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((cat) => (
                  <label
                    key={cat._id}
                    className="flex items-center gap-2 py-2 px-1 cursor-pointer hover:bg-gray-50 rounded-md transition"
                  >
                    <Checkbox
                      checked={categoryIds.includes(cat._id)}
                      onCheckedChange={() => dispatch(toggleCategory(cat._id))}
                    />
                    <span className="text-sm">{cat.name}</span>
                  </label>
                ))
              ) : (
                <p className="text-xs text-gray-400 px-2 py-2">No match found</p>
              )}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Subcategories */}
      <Card className="border border-gray-200 shadow-sm rounded-xl">
        <CardHeader
          className="flex items-center justify-between cursor-pointer py-2"
          onClick={() => toggleSection("subCategories")}
        >
          <CardTitle className="text-base font-semibold">
            Subcategories{" "}
            {subCategoryIds.length > 0 && (
              <span className="ml-2 text-xs px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full">
                {subCategoryIds.length}
              </span>
            )}
          </CardTitle>
          {openSections.subCategories ? (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-500" />
          )}
        </CardHeader>
        {openSections.subCategories && (
          <CardContent className="space-y-3">
            <Input
              placeholder="Search subcategories..."
              value={searchSub}
              onChange={(e) => setSearchSub(e.target.value)}
              className="text-sm"
            />
            <div className="max-h-48 overflow-y-auto divide-y">
              {filteredSubCategories.length > 0 ? (
                filteredSubCategories.map((sub) => (
                  <label
                    key={sub._id}
                    className="flex items-center gap-2 py-2 px-1 cursor-pointer hover:bg-gray-50 rounded-md transition"
                  >
                    <Checkbox
                      checked={subCategoryIds.includes(sub._id)}
                      onCheckedChange={() => dispatch(toggleSubCategory(sub._id))}
                    />
                    <span className="text-sm">{sub.name}</span>
                  </label>
                ))
              ) : (
                <p className="text-xs text-gray-400 px-2 py-2">No match found</p>
              )}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Child Categories */}
      <Card className="border border-gray-200 shadow-sm rounded-xl">
        <CardHeader
          className="flex items-center justify-between cursor-pointer py-2"
          onClick={() => toggleSection("childCategories")}
        >
          <CardTitle className="text-base font-semibold">
            Child Categories{" "}
            {childCategoryIds.length > 0 && (
              <span className="ml-2 text-xs px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full">
                {childCategoryIds.length}
              </span>
            )}
          </CardTitle>
          {openSections.childCategories ? (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-500" />
          )}
        </CardHeader>
        {openSections.childCategories && (
          <CardContent className="space-y-3">
            <Input
              placeholder="Search child categories..."
              value={searchChild}
              onChange={(e) => setSearchChild(e.target.value)}
              className="text-sm"
            />
            <div className="max-h-48 overflow-y-auto divide-y">
              {filteredChildCategories.length > 0 ? (
                filteredChildCategories.map((child) => (
                  <label
                    key={child._id}
                    className="flex items-center gap-2 py-2 px-1 cursor-pointer hover:bg-gray-50 rounded-md transition"
                  >
                    <Checkbox
                      checked={childCategoryIds.includes(child._id)}
                      onCheckedChange={() => dispatch(toggleChildCategory(child._id))}
                    />
                    <span className="text-sm">{child.name}</span>
                  </label>
                ))
              ) : (
                <p className="text-xs text-gray-400 px-2 py-2">No match found</p>
              )}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Reset */}
      <Button
        variant="outline"
        className="w-full border-red-300 text-red-600 hover:bg-red-50"
        onClick={() => dispatch(clearFilters())}
      >
        Clear Filters
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto min-h-screen px-4 py-8 flex flex-col md:flex-row gap-6">
      {/* Mobile trigger */}
      <div className="md:hidden mb-4">
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
          onClick={() => setFilterModalOpen(true)}
        >
          Filters
        </Button>
      </div>

      {/* Sidebar */}
      <aside className="hidden md:block md:w-[22%] sticky top-4 self-start">
        <FilterContent />
      </aside>

      {/* Product Grid */}
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 h-[368px]">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ShopCard key={product._id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        )}
      </main>

      {/* Mobile Filter Drawer */}
      {filterModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex">
          <div className="w-4/5 max-w-sm bg-white h-full p-6 overflow-y-auto shadow-xl relative animate-slideIn">
            <Button
              variant="ghost"
              className="absolute top-4 right-4"
              onClick={() => setFilterModalOpen(false)}
            >
              <X className="w-6 h-6" />
            </Button>
            <FilterContent />
          </div>
        </div>
      )}
    </div>
  );
}

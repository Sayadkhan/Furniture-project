"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import ShopCard from "./ShopCard";

export default function ShopClient({ products }) {
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);

  // Build unique filter options
  const categories = [];
  const subcategories = [];
  const colors = new Set();
  const sizes = new Set();
  const categoryMap = {};
  const subcategoryMap = {};

  products.forEach((product) => {
    if (product.category?._id && !categoryMap[product.category._id]) {
      categoryMap[product.category._id] = true;
      categories.push({ id: product.category._id, name: product.category.name });
    }
    if (product.subcategory?._id && !subcategoryMap[product.subcategory._id]) {
      subcategoryMap[product.subcategory._id] = true;
      subcategories.push({
        id: product.subcategory._id,
        name: product.subcategory.name,
        categoryId: product.category?._id || null,
      });
    }
    for (const variant of product.variants || []) {
      if (variant.attributes?.color) colors.add(variant.attributes.color);
      if (variant.attributes?.size) sizes.add(variant.attributes.size);
    }
  });

  // Filtering logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(product.category?._id)
      )
        return false;
      if (
        selectedSubcategories.length > 0 &&
        !selectedSubcategories.includes(product.subcategory?._id)
      )
        return false;
      if (
        selectedColors.length > 0 &&
        !product.variants?.some((v) =>
          selectedColors.includes(v.attributes?.color)
        )
      )
        return false;
      if (
        selectedSizes.length > 0 &&
        !product.variants?.some((v) =>
          selectedSizes.includes(v.attributes?.size)
        )
      )
        return false;
      return true;
    });
  }, [
    products,
    selectedCategories,
    selectedSubcategories,
    selectedColors,
    selectedSizes,
  ]);

  const availableSubcategories = useMemo(() => {
    return subcategories.filter(
      (sub) =>
        selectedCategories.length === 0 ||
        selectedCategories.includes(sub.categoryId)
    );
  }, [subcategories, selectedCategories]);

  const handleCheckbox = (setFn, selected, value) => {
    if (selected.includes(value)) {
      setFn(selected.filter((v) => v !== value));
    } else {
      setFn([...selected, value]);
    }
  };

  return (
    <div className="container mx-auto min-h-screen px-4 py-8 flex gap-6">
      {/* Sidebar */}
      <aside className="w-64 border rounded-lg p-4 h-fit sticky top-20">
        <h2 className="text-xl font-bold mb-4">Filters</h2>

        {/* Categories */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Categories</h3>
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2 mb-1">
              <Checkbox
                checked={selectedCategories.includes(cat.id)}
                onCheckedChange={() =>
                  handleCheckbox(setSelectedCategories, selectedCategories, cat.id)
                }
              />
              <span>{cat.name}</span>
            </label>
          ))}
        </div>

        {/* Subcategories */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Subcategories</h3>
          {availableSubcategories.map((sub) => (
            <label key={sub.id} className="flex items-center gap-2 mb-1">
              <Checkbox
                checked={selectedSubcategories.includes(sub.id)}
                onCheckedChange={() =>
                  handleCheckbox(
                    setSelectedSubcategories,
                    selectedSubcategories,
                    sub.id
                  )
                }
              />
              <span>{sub.name}</span>
            </label>
          ))}
        </div>

        {/* Colors */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Colors</h3>
          {[...colors].map((color) => (
            <label key={color} className="flex items-center gap-2 mb-1">
              <Checkbox
                checked={selectedColors.includes(color)}
                onCheckedChange={() =>
                  handleCheckbox(setSelectedColors, selectedColors, color)
                }
              />
              <span>{color}</span>
            </label>
          ))}
        </div>

        {/* Sizes */}
        <div>
          <h3 className="font-medium mb-2">Sizes</h3>
          {[...sizes].map((size) => (
            <label key={size} className="flex items-center gap-2 mb-1">
              <Checkbox
                checked={selectedSizes.includes(size)}
                onCheckedChange={() =>
                  handleCheckbox(setSelectedSizes, selectedSizes, size)
                }
              />
              <span>{size}</span>
            </label>
          ))}
        </div>
      </aside>

      {/* Products Grid */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-6">Shop</h1>
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ShopCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

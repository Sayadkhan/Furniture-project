"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";
import { Loader2, X } from "lucide-react";

export default function AddProductPage() {
  const [loading, setLoading] = useState(false);
  const [mainImages, setMainImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const [variants, setVariants] = useState([
    {
      attributes: { color: "", hexCode: "", size: "", material: "" },
      images: [],
      stock: 0,
      price: "",
    },
  ]);

  // 🔹 Load categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/category");
        const data = await res.json();
        if (res.ok) {
          setCategories(data.category || []);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubcategories = async () => {
      if (!selectedCategory) return;
      try {
        const res = await fetch(
          `/api/subcategory?category=${selectedCategory}`
        );
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setSubcategories(data.data || []);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchSubcategories();
  }, [selectedCategory]);

  const handleMainImageChange = (e) => {
    const files = Array.from(e.target.files);
    setMainImages((prev) => [...prev, ...files]);
  };

  const removeMainImage = (index) => {
    setMainImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const handleVariantAttrChange = (index, attr, value) => {
    const updated = [...variants];
    updated[index].attributes[attr] = value;
    setVariants(updated);
  };

  const handleVariantImageChange = (index, e) => {
    const files = Array.from(e.target.files);
    const updated = [...variants];
    updated[index].images = [...updated[index].images, ...files];
    setVariants(updated);
  };

  const removeVariantImage = (variantIndex, imageIndex) => {
    const updated = [...variants];
    updated[variantIndex].images = updated[variantIndex].images.filter(
      (_, i) => i !== imageIndex
    );
    setVariants(updated);
  };

  const addVariant = () => {
    setVariants([
      ...variants,
      {
        attributes: { color: "", hexCode: "", size: "", material: "" },
        images: [],
        stock: 0,
        price: "",
      },
    ]);
  };

  const removeVariant = (index) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  // 🔹 Submit product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    // 👉 Append category & subcategory
    formData.append("category", selectedCategory);
    formData.append("subcategory", selectedSubcategory);

    // 👉 Append main product images
    mainImages.forEach((file) => {
      formData.append("images", file);
    });

    // 👉 Build variants JSON (without images, images uploaded separately)
    const variantsData = variants.map((variant) => ({
      attributes: variant.attributes,
      stock: Number(variant.stock),
      price: Number(variant.price),
      images: [],
    }));

    formData.append("variants", JSON.stringify(variantsData));

    // 👉 Append variant images separately
    variants.forEach((variant, i) => {
      variant.images.forEach((file) => {
        formData.append(`variantImages_${i}`, file);
      });
    });

    try {
      const res = await fetch("/api/product", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        toast.success("✅ Product added successfully!");
        e.target.reset();
        setMainImages([]);
        setVariants([
          {
            attributes: { color: "", hexCode: "", size: "", material: "" },
            images: [],
            stock: 0,
            price: "",
          },
        ]);
        setSelectedCategory("");
        setSelectedSubcategory("");
      } else {
        toast.error("❌ Failed to add product: " + data.message);
      }
    } catch (err) {
      toast.error("❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 🔹 Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input name="name" placeholder="Product Name" required />
              <Input name="slug" placeholder="Slug (unique URL)" required />
              <Input name="shortDesc" placeholder="Short Description" />
            </div>

            {/* 🔹 Full Description */}
            <Textarea
              name="desc"
              placeholder="Full Description"
              className="h-28"
            />

            {/* 🔹 Category & Subcategory */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedSubcategory("");
                }}
                className="border rounded-lg p-2"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                className="border rounded-lg p-2"
                required
              >
                <option value="">Select SubCategory</option>
                {subcategories.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 🔹 Pricing & Stock */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                name="price"
                type="number"
                placeholder="Base Price"
                min="0"
                required
              />
              <Input
                name="stock"
                type="number"
                placeholder="Base Stock"
                min="0"
                required
              />
              <Input
                name="discount"
                type="number"
                placeholder="Discount"
                min="0"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                name="discountType"
                className="border rounded-lg p-2 w-full"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="flat">Flat (BDT)</option>
              </select>
              <Input name="tags" placeholder="Tags (comma separated)" />
            </div>

            {/* 🔹 Main Images */}
            <div>
              <label className="block font-medium mb-2">Product Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleMainImageChange}
              />
              <div className="flex flex-wrap gap-3 mt-3">
                {mainImages.map((file, index) => (
                  <div
                    key={index}
                    className="relative w-24 h-24 border rounded-lg overflow-hidden"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeMainImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 🔹 Variants */}
            <div>
              <label className="block font-medium mb-2">Variants</label>
              {variants.map((variant, index) => (
                <Card key={index} className="p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      placeholder="Color Name"
                      value={variant.attributes.color}
                      onChange={(e) =>
                        handleVariantAttrChange(index, "color", e.target.value)
                      }
                    />
                    <Input
                      type="color"
                      value={variant.attributes.hexCode}
                      onChange={(e) =>
                        handleVariantAttrChange(
                          index,
                          "hexCode",
                          e.target.value
                        )
                      }
                    />
                    <Input
                      placeholder="Size"
                      value={variant.attributes.size}
                      onChange={(e) =>
                        handleVariantAttrChange(index, "size", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Material"
                      value={variant.attributes.material}
                      onChange={(e) =>
                        handleVariantAttrChange(
                          index,
                          "material",
                          e.target.value
                        )
                      }
                    />
                    <Input
                      type="number"
                      placeholder="Variant Stock"
                      value={variant.stock}
                      onChange={(e) =>
                        handleVariantChange(index, "stock", e.target.value)
                      }
                    />
                    <Input
                      type="number"
                      placeholder="Variant Price"
                      value={variant.price}
                      onChange={(e) =>
                        handleVariantChange(index, "price", e.target.value)
                      }
                    />
                  </div>

                  {/* 🔹 Variant Images */}
                  <div className="mt-3">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleVariantImageChange(index, e)}
                    />
                    <div className="flex flex-wrap gap-3 mt-2">
                      {variant.images.map((file, imgIndex) => (
                        <div
                          key={imgIndex}
                          className="relative w-20 h-20 border rounded-lg overflow-hidden"
                        >
                          <img
                            src={URL.createObjectURL(file)}
                            alt="variant"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeVariantImage(index, imgIndex)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="destructive"
                    className="mt-3"
                    onClick={() => removeVariant(index)}
                  >
                    Remove Variant
                  </Button>
                </Card>
              ))}
              <Button
                type="button"
                variant="secondary"
                className="mt-3"
                onClick={addVariant}
              >
                + Add Variant
              </Button>
            </div>

            {/* 🔹 Submit */}
            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={18} />
                    Saving...
                  </>
                ) : (
                  "Save Product"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

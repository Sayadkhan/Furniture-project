"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";
import { Loader2, X, PlusCircle } from "lucide-react";

export default function AddProductForm({ categories }) {
  const [loading, setLoading] = useState(false);
  const [mainImages, setMainImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedChildcategory, setSelectedChildcategory] = useState("");


  const [variants, setVariants] = useState([
    {
      attributes: { color: "", hexCode: "#000000", size: "", material: "" },
      images: [],
      stock: 0,
      price: "",
    },
  ]);

  // --- Handlers ---
  const handleMainImageChange = (e) => {
    const files = Array.from(e.target.files);
    setMainImages((prev) => [...prev, ...files]);
  };
  const removeMainImage = (index) => {
    setMainImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleVariantAttrChange = (index, attr, value) => {
    const updated = [...variants];
    updated[index].attributes[attr] = value;
    if (attr === "hexCode") {
      updated[index].attributes.color = value; // keep sync with hexCode
    }
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
        attributes: { color: "", hexCode: "#000000", size: "", material: "" },
        images: [],
        stock: 0,
        price: "",
      },
    ]);
  };

  const removeVariant = (index) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);

    formData.append("category", selectedCategory);
    formData.append("subcategory", selectedSubcategory);
    formData.append("childcategory", selectedChildcategory)

    mainImages.forEach((file) => {
      formData.append("images", file);
    });

    const variantsData = variants.map((variant) => ({
      attributes: variant.attributes,
      stock: Number(variant.stock),
      price: Number(variant.price),
      images: [],
    }));
    formData.append("variants", JSON.stringify(variantsData));

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
            attributes: { color: "", hexCode: "#000000", size: "", material: "" },
            images: [],
            stock: 0,
            price: "",
          },
        ]);
        setSelectedCategory("");
        setSelectedSubcategory("");
      } else {
        toast.error("❌ Failed: " + data.message);
      }
    } catch (err) {
      toast.error("❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Add New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="name" placeholder="Product Name" required />
            <Input name="slug" placeholder="Slug (unique URL)" required />
            <Input name="shortDesc" placeholder="Short Description" />
          </div>
          <Textarea name="desc" placeholder="Full Description" className="h-28" />

          {/* Category + Subcategory */}
            {/* Category + Subcategory + Childcategory */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category */}
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedSubcategory("");
                setSelectedChildcategory("");
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

            {/* SubCategory */}
            <select
              value={selectedSubcategory}
              onChange={(e) => {
                setSelectedSubcategory(e.target.value);
                setSelectedChildcategory("");
              }}
              className="border rounded-lg p-2"
              required
              disabled={!selectedCategory}
            >
              <option value="">Select SubCategory</option>
              {categories
                .find((c) => c._id === selectedCategory)
                ?.subcategories.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
            </select>

            {/* ChildCategory */}
            <select
              value={selectedChildcategory}
              onChange={(e) => setSelectedChildcategory(e.target.value)}
              className="border rounded-lg p-2"
              required
              disabled={!selectedSubcategory}
            >
              <option value="">Select ChildCategory</option>
              {categories
                .find((c) => c._id === selectedCategory)
                ?.subcategories.find((s) => s._id === selectedSubcategory)
                ?.childcategories.map((child) => (
                  <option key={child._id} value={child._id}>
                    {child.name}
                  </option>
                ))}
            </select>
          </div>
          {/* Base Pricing & Stock */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input name="price" type="number" placeholder="Base Price" min="0" required />
            <Input name="stock" type="number" placeholder="Base Stock" min="0" required />
            <Input name="discount" type="number" placeholder="Discount" min="0" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select name="discountType" className="border rounded-lg p-2 w-full">
              <option value="percentage">Percentage (%)</option>
              <option value="flat">Flat (BDT)</option>
            </select>
            <Input name="tags" placeholder="Tags (comma separated)" />
          </div>

          {/* Product Images */}
          <div>
            <label className="block font-medium mb-2">Product Images</label>
            <input
              type="file"
              multiple
              onChange={handleMainImageChange}
              className="border rounded p-2 w-full"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {mainImages.map((file, index) => (
                <div key={index} className="relative w-20 h-20">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="w-full h-full object-cover rounded"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    onClick={() => removeMainImage(index)}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Variants */}
          <div>
            <h3 className="font-semibold mb-3">Variants</h3>
            {variants.map((variant, index) => (
              <Card key={index} className="p-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Input
                    placeholder="Color Name"
                    value={variant.attributes.color}
                    onChange={(e) =>
                      handleVariantAttrChange(index, "color", e.target.value)
                    }
                  />
                  <input
                    type="color"
                    value={variant.attributes.hexCode}
                    onChange={(e) =>
                      handleVariantAttrChange(index, "hexCode", e.target.value)
                    }
                    className="h-10 w-full rounded border"
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
                      handleVariantAttrChange(index, "material", e.target.value)
                    }
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                  <Input
                    type="number"
                    placeholder="Price"
                    value={variant.price}
                    onChange={(e) => {
                      const updated = [...variants];
                      updated[index].price = e.target.value;
                      setVariants(updated);
                    }}
                  />
                  <Input
                    type="number"
                    placeholder="Stock"
                    value={variant.stock}
                    onChange={(e) => {
                      const updated = [...variants];
                      updated[index].stock = e.target.value;
                      setVariants(updated);
                    }}
                  />
                </div>

                {/* Variant Images */}
                <div className="mt-3">
                  <label className="block font-medium mb-2">Variant Images</label>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleVariantImageChange(index, e)}
                    className="border rounded p-2 w-full"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {variant.images.map((file, i) => (
                      <div key={i} className="relative w-20 h-20">
                        <img
                          src={URL.createObjectURL(file)}
                          alt="preview"
                          className="w-full h-full object-cover rounded"
                        />
                        <button
                          type="button"
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                          onClick={() => removeVariantImage(index, i)}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end mt-3">
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeVariant(index)}
                  >
                    Remove Variant
                  </Button>
                </div>
              </Card>
            ))}
            <Button
              type="button"
              className="flex items-center gap-2"
              onClick={addVariant}
            >
              <PlusCircle size={16} /> Add Variant
            </Button>
          </div>

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
  );
}

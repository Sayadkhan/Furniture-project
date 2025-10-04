"use client";
import React, { useState, useEffect } from "react";
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

  // --- Name & Slug ---
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const [variants, setVariants] = useState([
    {
      attributes: { color: "", size: "", material: "" },
      images: [],
      stock: 0,
      price: "",
    },
  ]);

  // --- Auto-generate slug ---
  useEffect(() => {
    if (name) {
      setSlug(
        name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      );
    } else {
      setSlug("");
    }
  }, [name]);

  // --- Handle Main Image Upload ---
  const handleMainImageChange = (e) => {
    setMainImages([...mainImages, ...Array.from(e.target.files)]);
  };

  const removeMainImage = (index) => {
    const newImages = [...mainImages];
    newImages.splice(index, 1);
    setMainImages(newImages);
  };

  // --- Handle Variant Image Upload ---
  const handleVariantImageChange = (index, e) => {
    const newVariants = [...variants];
    newVariants[index].images = [
      ...newVariants[index].images,
      ...Array.from(e.target.files),
    ];
    setVariants(newVariants);
  };

  const removeVariantImage = (variantIndex, imgIndex) => {
    const newVariants = [...variants];
    newVariants[variantIndex].images.splice(imgIndex, 1);
    setVariants(newVariants);
  };

  // --- Add/Remove Variant ---
  const addVariant = () => {
    setVariants([
      ...variants,
      {
        attributes: { color: "", size: "", material: "" },
        images: [],
        stock: 0,
        price: "",
      },
    ]);
  };

  const removeVariant = (index) => {
    const newVariants = [...variants];
    newVariants.splice(index, 1);
    setVariants(newVariants);
  };

  // --- Submit Form ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("category", selectedCategory);
    formData.append("subcategory", selectedSubcategory);
    formData.append("childcategory", selectedChildcategory);

    formData.append("shortDesc", e.target.shortDesc.value);
    formData.append("desc", e.target.desc.value);

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
            attributes: { color: "", size: "", material: "" },
            images: [],
            stock: 0,
            price: "",
          },
        ]);
        setSelectedCategory("");
        setSelectedSubcategory("");
        setSelectedChildcategory("");
        setName("");
        setSlug("");
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
            <Input
              name="name"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              name="slug"
              placeholder="Slug (auto-generated)"
              value={slug}
              readOnly
            />
            <Input name="shortDesc" placeholder="Short Description" required />
          </div>
          <Textarea
            name="desc"
            placeholder="Full Description"
            className="h-28"
            required
          />

          {/* Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border rounded-md p-2"
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
              className="border rounded-md p-2"
            >
              <option value="">Select Subcategory</option>
              {categories
                .find((cat) => cat._id === selectedCategory)
                ?.subcategories?.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
            </select>

            <select
              value={selectedChildcategory}
              onChange={(e) => setSelectedChildcategory(e.target.value)}
              className="border rounded-md p-2"
            >
              <option value="">Select Childcategory</option>
              {categories
                .find((cat) => cat._id === selectedCategory)
                ?.subcategories?.find((sub) => sub._id === selectedSubcategory)
                ?.childcategories?.map((child) => (
                  <option key={child._id} value={child._id}>
                    {child.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Main Images */}
          <div>
            <label className="block font-semibold mb-2">Main Images</label>
            <Input type="file" multiple onChange={handleMainImageChange} />
            <div className="flex flex-wrap gap-2 mt-2">
              {mainImages.map((file, i) => (
                <div
                  key={i}
                  className="relative w-20 h-20 border rounded-md overflow-hidden"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="object-cover w-full h-full"
                  />
                  <button
                    type="button"
                    onClick={() => removeMainImage(i)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Variants */}
          <div className="space-y-4">
            <label className="block font-semibold">Variants</label>
            {variants.map((variant, index) => (
              <div
                key={index}
                className="border rounded-md p-4 space-y-3 bg-gray-50 relative"
              >
                <button
                  type="button"
                  onClick={() => removeVariant(index)}
                  className="absolute top-2 right-2 text-red-600"
                >
                  <X />
                </button>
                <Input
                  placeholder="Color Name"
                  value={variant.attributes.color}
                  onChange={(e) => {
                    const newVariants = [...variants];
                    newVariants[index].attributes.color = e.target.value;
                    setVariants(newVariants);
                  }}
                  required
                />
                <Input
                  placeholder="Size"
                  value={variant.attributes.size}
                  onChange={(e) => {
                    const newVariants = [...variants];
                    newVariants[index].attributes.size = e.target.value;
                    setVariants(newVariants);
                  }}
                />
                <Input
                  placeholder="Material"
                  value={variant.attributes.material}
                  onChange={(e) => {
                    const newVariants = [...variants];
                    newVariants[index].attributes.material = e.target.value;
                    setVariants(newVariants);
                  }}
                />
                <Input
                  type="number"
                  placeholder="Stock"
                  value={variant.stock}
                  onChange={(e) => {
                    const newVariants = [...variants];
                    newVariants[index].stock = e.target.value;
                    setVariants(newVariants);
                  }}
                />
                <Input
                  type="number"
                  placeholder="Price"
                  value={variant.price}
                  onChange={(e) => {
                    const newVariants = [...variants];
                    newVariants[index].price = e.target.value;
                    setVariants(newVariants);
                  }}
                />
                <Input
                  type="file"
                  multiple
                  onChange={(e) => handleVariantImageChange(index, e)}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {variant.images.map((file, i) => (
                    <div
                      key={i}
                      className="relative w-16 h-16 border rounded-md overflow-hidden"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        className="object-cover w-full h-full"
                      />
                      <button
                        type="button"
                        onClick={() => removeVariantImage(index, i)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <Button
              type="button"
              onClick={addVariant}
              className="flex items-center gap-2"
            >
              <PlusCircle size={18} /> Add Variant
            </Button>
          </div>

          {/* Submit */}
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

"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";
import { Loader2, X } from "lucide-react";

export default function EditProductPage({ product }) {

  console.log(product)

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [mainImages, setMainImages] = useState([]);
  const [oldImages, setOldImages] = useState(product?.images || []);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(product?.category?._id || "");
  const [selectedSubcategory, setSelectedSubcategory] = useState(product?.subcategory?._id || "");
  const [selectedChildcategory, setSelectedChildcategory] = useState(product?.childcategory?._id || "");
  const [variants, setVariants] = useState(
    product?.variants?.length
      ? product.variants.map((v) => ({
          attributes: v.attributes,
          stock: v.stock,
          price: v.price,
          images: [],
          oldImages: v.images || [],
        }))
      : []
  );

  console.log(childCategories)
  console.log(selectedChildcategory)

  // Load categories
  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then((data) => setCategories(data.category || []))
      .catch(console.error);
  }, []);

  // Load subcategories when category changes
  useEffect(() => {
    if (!selectedCategory) return;
    fetch(`/api/subcategory?category=${selectedCategory}`)
      .then((res) => res.json())
      .then((data) => setSubcategories(data.data || []))
      .catch(console.error);
  }, [selectedCategory]);
  // load childcategory when Subcategory Chnages
useEffect(() => {
  if (!selectedSubcategory) return; // note: it should match your state
  fetch(`/api/childcategory?subcategory=${selectedSubcategory}`)
    .then((res) => res.json())
    .then((data) => setChildCategories(data.data || []))
    .catch(console.error);
}, [selectedSubcategory]);


  // Handlers
  const handleMainImageChange = (e) => setMainImages([...mainImages, ...Array.from(e.target.files)]);
  const removeMainImage = (i) => setMainImages(mainImages.filter((_, idx) => idx !== i));
  const removeOldImage = (i) => setOldImages(oldImages.filter((_, idx) => idx !== i));

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
    const updated = [...variants];
    updated[index].images = [...updated[index].images, ...Array.from(e.target.files)];
    setVariants(updated);
  };
  const removeVariantImage = (vIndex, i) => {
    const updated = [...variants];
    updated[vIndex].images = updated[vIndex].images.filter((_, idx) => idx !== i);
    setVariants(updated);
  };
  const removeVariantOldImage = (vIndex, i) => {
    const updated = [...variants];
    updated[vIndex].oldImages = updated[vIndex].oldImages.filter((_, idx) => idx !== i);
    setVariants(updated);
  };
  const addVariant = () => setVariants([...variants, { attributes: { color: "", hexCode: "", size: "", material: "" }, stock: 0, price: "", images: [], oldImages: [] }]);
  const removeVariant = (i) => setVariants(variants.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);

    formData.append("category", selectedCategory);
    formData.append("subcategory", selectedSubcategory);
    formData.append("childcategory", selectedChildcategory);
    mainImages.forEach((file) => formData.append("images", file));
    formData.append("oldImages", JSON.stringify(oldImages));

    const variantsData = variants.map((v) => ({
      attributes: v.attributes,
      stock: Number(v.stock),
      price: Number(v.price),
      oldImages: v.oldImages || [],
      images: [],
    }));
    formData.append("variants", JSON.stringify(variantsData));

    variants.forEach((variant, i) =>
      variant.images.forEach((file) => formData.append(`variantImages_${i}`, file))
    );

    try {
      const res = await fetch(`/api/product/${product._id}`, {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("✅ Product updated successfully!");
        router.push("/admin/product/all");
      } else {
        toast.error("❌ " + (data.message || "Failed to update product"));
      }
    } catch (err) {
      toast.error("❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <p className="p-6">Loading product...</p>;

  return (
    <div className="p-6">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Edit Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input name="name" placeholder="Product Name" defaultValue={product.name} required />
              <Input name="slug" placeholder="Slug (unique URL)" defaultValue={product.slug} required />
              <Input name="shortDesc" placeholder="Short Description" defaultValue={product.shortDesc || ""} />
            </div>
            <Textarea name="desc" placeholder="Full Description" className="h-28" defaultValue={product.desc || ""} />
            {/* Category & Subcategory */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select value={selectedCategory} onChange={(e) => { setSelectedCategory(e.target.value); setSelectedSubcategory(""); }} className="border rounded-lg p-2" required>
                <option value="">Select Category</option>
                {categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
              </select>
              <select value={selectedSubcategory} onChange={(e) => setSelectedSubcategory(e.target.value)} className="border rounded-lg p-2" required>
                <option value="">Select SubCategory</option>
                {subcategories.map((sub) => <option key={sub._id} value={sub._id}>{sub.name}</option>)}
              </select>
              <select value={selectedChildcategory} onChange={(e) => setSelectedChildcategory(e.target.value)} className="border rounded-lg p-2" required>
                <option value="">Select ChildCategory</option>
                {childCategories.map((sub) => <option key={sub._id} value={sub._id}>{sub.name}</option>)}
              </select>
            </div>
            {/* Pricing & Stock */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input name="price" type="number" placeholder="Base Price" min="0" defaultValue={product.price} required />
              <Input name="stock" type="number" placeholder="Base Stock" min="0" defaultValue={product.stock} required />
              <Input name="discount" type="number" placeholder="Discount" min="0" defaultValue={product.discount || 0} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select name="discountType" className="border rounded-lg p-2 w-full" defaultValue={product.discountType}>
                <option value="percentage">Percentage (%)</option>
                <option value="flat">Flat (BDT)</option>
              </select>
              <Input name="tags" placeholder="Tags (comma separated)" defaultValue={product.tags?.join(",") || ""} />
            </div>

            {/* Main Images */}
            <div>
              <label className="block font-medium mb-2">Product Images</label>
              <div className="flex flex-wrap gap-3 mb-3">
                {oldImages.map((url, index) => (
                  <div key={index} className="relative w-24 h-24 border rounded-lg overflow-hidden">
                    <img src={url} alt="old" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => removeOldImage(index)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"><X size={14} /></button>
                  </div>
                ))}
              </div>
              <input type="file" multiple accept="image/*" onChange={handleMainImageChange} />
              <div className="flex flex-wrap gap-3 mt-3">
                {mainImages.map((file, i) => (
                  <div key={i} className="relative w-24 h-24 border rounded-lg overflow-hidden">
                    <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => removeMainImage(i)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"><X size={14} /></button>
                  </div>
                ))}
              </div>
            </div>

            {/* Variants */}
            <div>
              <label className="block font-medium mb-2">Variants</label>
              {variants.map((variant, index) => (
                <Card key={index} className="p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input placeholder="Color" value={variant.attributes.color} onChange={(e) => handleVariantAttrChange(index, "color", e.target.value)} />
                    <Input type="color" value={variant.attributes.hexCode} onChange={(e) => handleVariantAttrChange(index, "hexCode", e.target.value)} />
                    <Input placeholder="Size" value={variant.attributes.size} onChange={(e) => handleVariantAttrChange(index, "size", e.target.value)} />
                    <Input placeholder="Material" value={variant.attributes.material} onChange={(e) => handleVariantAttrChange(index, "material", e.target.value)} />
                    <Input type="number" placeholder="Variant Stock" value={variant.stock} onChange={(e) => handleVariantChange(index, "stock", e.target.value)} />
                    <Input type="number" placeholder="Variant Price" value={variant.price} onChange={(e) => handleVariantChange(index, "price", e.target.value)} />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {variant.oldImages?.map((url, i) => (
                      <div key={i} className="relative w-20 h-20 border rounded-lg overflow-hidden">
                        <img src={url} alt="old-variant" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => removeVariantOldImage(index, i)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"><X size={14} /></button>
                      </div>
                    ))}
                    {variant.images?.map((file, i) => (
                      <div key={i} className="relative w-20 h-20 border rounded-lg overflow-hidden">
                        <img src={URL.createObjectURL(file)} alt="variant" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => removeVariantImage(index, i)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"><X size={14} /></button>
                      </div>
                    ))}
                  </div>
                  <input type="file" multiple accept="image/*" onChange={(e) => handleVariantImageChange(index, e)} className="mt-2" />
                  <Button type="button" variant="destructive" className="mt-2" onClick={() => removeVariant(index)}>Remove Variant</Button>
                </Card>
              ))}
              <Button type="button" variant="secondary" onClick={addVariant}>+ Add Variant</Button>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? <><Loader2 className="animate-spin mr-2" size={18} />Saving...</> : "Update Product"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

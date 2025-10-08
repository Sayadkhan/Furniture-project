import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/mongodb";
import Product from "@/model/Product";
import { NextResponse } from "next/server";

import Category from "@/model/Category";
import SubCategory from "@/model/SubCategory";

// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import Product from "@/models/Product";

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find()
      .populate("category", "name")
      .populate("subcategory", "name")
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, products });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.formData();

    console.log(formData);

    // 🔹 Upload main product images
    const files = formData.getAll("images");
    let imageUrls = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadRes = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "products" }, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          })
          .end(buffer);
      });

      imageUrls.push(uploadRes.secure_url);
    }

    // 🔹 Parse variants JSON
    let variants = formData.get("variants")
      ? JSON.parse(formData.get("variants"))
      : [];

    // 🔹 Upload variant-wise images
    for (let i = 0; i < variants.length; i++) {
      let key = `variantImages_${i}`;
      const variantFiles = formData.getAll(key);

      let variantUrls = [];
      for (const vFile of variantFiles) {
        const bytes = await vFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadRes = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "products/variants" }, (err, result) => {
              if (err) reject(err);
              else resolve(result);
            })
            .end(buffer);
        });

        variantUrls.push(uploadRes.secure_url);
      }

      // attach uploaded images to this variant
      variants[i].images = variantUrls;
    }

    // 🔹 Build product data
    const productData = {
      name: formData.get("name"),
      slug: formData.get("slug"),
      shortDesc: formData.get("shortDesc"),
      desc: formData.get("desc"),

      price: Number(formData.get("price")),
      stock: Number(formData.get("stock")),
      discount: Number(formData.get("discount") || 0),
      discountType: formData.get("discountType") || "percentage",
      category: formData.get("category"),
      childcategory: formData.get("childcategory") || null,
      subcategory: formData.get("subcategory"),
      tags: formData.get("tags") ? formData.get("tags").split(",") : [],
      images: imageUrls,
      variants,
    };

    // 🔹 Save product
    const product = new Product(productData);
    await product.save();

    return NextResponse.json({ success: true, product });
  } catch (err) {
    console.log(err);
    console.error("❌ Error saving product:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

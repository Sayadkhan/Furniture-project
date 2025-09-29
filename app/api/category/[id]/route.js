import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/mongodb";
import Category from "@/model/Category";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    const formData = await req.formData();
    const name = formData.get("name");
    const desc = formData.get("desc");
    const imageFile = formData.get("image");

    // Update name and description if provided
    if (name) category.name = name;
    if (desc) category.desc = desc;

    // Handle image upload
    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const uploadRes = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "categories" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(buffer);
      });
      category.image = uploadRes.secure_url;
    }

    await category.save();

    return NextResponse.json(
      { success: true, data: category },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

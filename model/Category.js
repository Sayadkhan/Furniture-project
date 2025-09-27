import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    desc: { type: String },
    image: { type: String, required: true },
    Featured: { type: Boolean, default: false },
    New_Arrivable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ✅ Prevent model overwrite in Next.js hot reload
export default mongoose.models.Category ||
  mongoose.model("Category", CategorySchema);

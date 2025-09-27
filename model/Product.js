import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    shortDesc: { type: String },
    desc: { type: String },

    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },

    discount: { type: Number, default: 0 },
    discountType: {
      type: String,
      enum: ["percentage", "flat"],
      default: "percentage",
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory", // ✅ correct
    },

    tags: [{ type: String }],

    images: [{ type: String }],

    variants: [
      {
        attributes: {
          color: { type: String },
          hexCode: { type: String },
          size: { type: String },
          material: { type: String },
        },
        images: [{ type: String }],
        stock: { type: Number, default: 0 },
        price: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);

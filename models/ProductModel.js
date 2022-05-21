import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Ürün ismi gerekli"],
      trim: true,
    },
    productImage: {
      type: String,
      required: [true, "Ürün resmi gerekli"],
    },
    brand: {
      type: String,
      required: [true, "Ürün markası gerekli"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Ürün fiyatı gerekli"],
    },
    category: {
      type: String,
      required: [true, "Ürün kategorisi gerekli"],
    },
    countInStock: {
      type: Number,
      default: 0,
      required: [true, "Ürün stok miktarı gerekli"],
    },
    description: {
      type: String,
      required: [true, "Ürün açıklaması gerekli"],
    },
    averageRating: {
      type: Number,
      min: [1, "1 den yüksek olmalı"],
      max: [10, "10 dan az olmalı"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
  }
);

ProductSchema.pre("remove", async function (next) {
  await this.model("Review").deleteMany({ productId: this._id });
  next();
});

ProductSchema.virtual("Reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "productId",
  justOne: false,
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;

import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Başlık gerekli"],
    trim: true,
    maxlength: [100, "çok uzun 100 karakterden az yazın"],
  },
  text: {
    type: String,
    required: [true, "Yazı gereklidir"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, "Lütfen 1-5 arası girin"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

ReviewSchema.index({ productId: 1, userId: 1 }, { unique: true });

ReviewSchema.statics.getRating = async function (productId) {
  const obj = await this.aggregate([
    {
      $match: { productId: productId },
    },
    {
      $group: {
        _id: "$productId",
        averageRating: { $avg: "$rating" },
      },
    },
  ]);
  try {
    await this.model("Product").findByIdAndUpdate(productId, {
      averageRating: obj[0].averageRating,
    });
  } catch (error) {
    console.log(error);
  }
};

ReviewSchema.post("save", function () {
  this.constructor.getRating(this.productId);
});

ReviewSchema.pre("remove", function () {
  this.constructor.getRating(this.productId);
});

const Review = mongoose.model("Review", ReviewSchema);
export default Review;

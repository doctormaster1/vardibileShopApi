import asyncHandler from "../middlewares/async";
import Review from "../models/ReviewModel";
import Product from "../models/ProductModel";
import { NotFound } from "../utilis/NotFound";

export const getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.productId) {
    const findProduct = await Product.findById(req.params.productId);

    if (!findProduct) throw NotFound(res);

    const productReview = await Review.find({
      productId: req.params.productId,
    }).populate({ path: "userId", select: "name email" });

    return res.status(200).send({
      status: "success",
      count: productReview.length,
      data: productReview,
    });
  } else {
    res.status(200).send({ status: "success", data: res.advanceResults });
  }
});

export const getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: "userId",
    select: "name email",
  });

  if (!review) throw NotFound(res);

  res
    .status(200)
    .send({ status: "success", count: review.length, data: review });
});

export const createReview = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.body.productId);
  const data = req.body.data;
  const jsonData = JSON.parse(data);

  if (!product) throw NotFound(res);

  const isReview = await Review.findOne({
    productId: req.body.productId,
    userId: req.body.user,
  });

  if (isReview)
    throw res.status(409).send({ status: "error", message: "Zaten incelendi" });

  const review = await Review.create({
    title: jsonData.title,
    text: jsonData.text,
    rating: jsonData.rating,
    productId: req.body.productId,
    userId: req.body.userId,
  });

  res.status(201).send({ status: "success", data: review });
});

export const updateReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) throw NotFound(res);

  const findReview = await Review.findOne({
    productId: req.body.productId,
    userId: req.body.userId,
  });

  if (!findReview)
    throw res
      .status(401)
      .send({ status: "fail", message: "Yetkisiz kullanıcı" });

  const editReview = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!editReview)
    throw res
      .status(400)
      .send({ status: "error", message: "Güncellemede sorun çıktı" });

  const updatedReview = await Review.findById(req.params.id);

  if (!updatedReview)
    throw res
      .status(400)
      .send({ status: "error", message: "Güncellenen inceleme bulunamadı" });

  res.status(200).send({ status: "success", data: updatedReview });
});

export const removeReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) throw NotFound(res);

  const findReview = await Review.findOne({
    productId: req.params.productId,
    userId: req.user._id,
  });

  if (!findReview && req.user.role == "admin")
    throw res
      .status(401)
      .send({ status: "fail", message: "Yetkisiz kullanıcı" });

  await review.remove();
  res.status(204).send({ status: "success", message: "İnceleme silindi" });
});

export const updateRating = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) throw NotFound(res);

  const findReview = await Review.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (!findReview && req.user.role !== "admin")
    throw createError(400, "Yetkisiz kanıcı");

  review.rating = req.body.newRating;
  await review.save();
  const updatedreview = await Review.findById(req.params.id);

  res.status(200).send({ status: "success", data: updatedreview });
});

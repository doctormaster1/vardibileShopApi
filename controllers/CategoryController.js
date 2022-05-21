import asyncHandler from "../middlewares/async";
import Category from "../models/CategoryModel";
import { NotFound } from "../utilis/NotFound";

export const getCategories = asyncHandler(async (req, res, next) => {
  res.status(200).send({ status: "success", data: res.advanceResults });
});

export const getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.categoryId);

  if (!category) throw NotFound(res);

  res.status(200).send({ status: "success", data: category });
});

export const addCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.create(req.body);
  res.status(201).send({ status: "success", data: category });
});

export const updateCategory = asyncHandler(async (req, res, next) => {
  const editCategory = await Category.findByIdAndUpdate(
    req.params.categoryId,
    req.body,
    { new: true, runValidators: true }
  );

  if (!editCategory) throw NotFound(res);

  const updatedCategory = await Category.findById(req.params.categoryId);
  res.status(201).send({ status: "success", data: updatedCategory });
});

export const removeCategory = asyncHandler(async (req, res, next) => {
  const findCategory = await Category.findById(req.params.categoryId);

  if (!findCategory) throw NotFound(res);

  findCategory.remove();
  res.status(204).send({ status: "success", message: "Kategory silindi" });
});

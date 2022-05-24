import { Router } from "express";

import Category from "../models/CategoryModel";
import advanceResults from "../middlewares/advanceResults";
import {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  removeCategory,
} from "../controllers/CategoryController";
import { protect } from "../middlewares/auth";

const router = Router();

router
  .route("/")
  .get(advanceResults(Category), getCategories)
  .post(protect, addCategory);
router
  .route("/:categoryId")
  .get(getCategory)
  .put(protect, updateCategory)
  .delete(protect, removeCategory);

export default router;

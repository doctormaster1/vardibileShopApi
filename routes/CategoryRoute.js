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

const router = Router();

router
  .route("/")
  .get(advanceResults(Category), getCategories)
  .post(addCategory);
router
  .route("/:categoryId")
  .get(getCategory)
  .put(updateCategory)
  .delete(removeCategory);

export default router;

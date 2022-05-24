import { Router } from "express";

import reviewRouter from "./ReviewRoute";
import advanceResults from "../middlewares/advanceResults";
import Product from "../models/ProductModel";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  removeProduct,
} from "../controllers/ProductController";
import { protect } from "../middlewares/auth";

const router = Router();

router
  .route("/")
  .get(
    advanceResults(Product, {
      path: "Reviews",
      select: "title",
    }),
    getProducts,
    getProducts
  )
  .post(protect, createProduct);
router.route("/:productId/reviews", reviewRouter);
router
  .route("/:productId")
  .get(getProduct)
  .put(protect, updateProduct)
  .delete(protect, removeProduct);

export default router;

import { Router } from "express";

import advanceResults from "../middlewares/advanceResults";
import Product from "../models/ProductModel";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  removeProduct,
} from "../controllers/ProductController";

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
  .post(createProduct);
router
  .route("/:productId")
  .get(getProduct)
  .put(updateProduct)
  .delete(removeProduct);

export default router;

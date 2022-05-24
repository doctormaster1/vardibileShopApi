import { Router } from "express";

import Review from "../models/ReviewModel";
import advanceResults from "../middlewares/advanceResults";
import {
  getReviews,
  getReview,
  createReview,
  updateReview,
  removeReview,
  updateRating,
} from "../controllers/ReviewController";
import { protect } from "../middlewares/auth";

const router = Router({ mergeParams: true });

router
  .route("/")
  .get(
    advanceResults(Review, { path: "productId", select: "name brand" }),
    getReviews
  )
  .post(protect, createReview);
router
  .route("/:id")
  .get(getReview)
  .put(protect, updateReview)
  .delete(protect, removeReview);
router.route("/update-rating/:id").put(protect, updateRating);

export default router;

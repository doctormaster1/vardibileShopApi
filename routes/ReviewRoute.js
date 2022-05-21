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

const router = Router({ mergeParams: true });

router
  .route("/")
  .get(
    advanceResults(Review, { path: "productId", select: "name brand" }),
    getReviews
  )
  .post(createReview);
router.route("/:id").get(getReview).put(updateReview).delete(removeReview);
router.route("/update-rating/:id").put(updateRating);

export default router;

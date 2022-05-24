import { Router } from "express";

import Order from "../models/OrderModel";
import advanceResults from "../middlewares/advanceResults";
import {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  removeOrder,
  payment,
  deliverOrder,
} from "../controllers/OrderConstroller";
import { protect } from "../middlewares/auth";

const router = Router();

router.use(protect);

router
  .route("/")
  .get(
    advanceResults(Order, {
      path: "userId",
      select: "name email",
    }),
    getOrders
  )
  .post(createOrder);
router.route("/:orderId").get(getOrder).put(updateOrder).delete(removeOrder);
router.route("/:orderId/pay").post(payment);
router.route("/:orderId/deliver").post(deliverOrder);

export default router;

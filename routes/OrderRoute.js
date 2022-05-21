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

const router = Router();

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

import asyncHandler from "../middlewares/async";
import Order from "../models/OrderModel";
import { NotFound } from "../utilis/NotFound";

export const getOrders = asyncHandler(async (req, res, next) => {
  res.status(200).send({ status: "success", data: res.advanceResults });
});

export const getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.orderId).populate({
    path: "userId",
    select: "name email",
  });

  if (!order) throw NotFound(res);

  res.status(200).send({ status: "success", data: order });
});

export const createOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.create({
    ...req.body.data,
    userId: req.body.userId,
  });

  res.status(201).send({ status: "success", data: order });
});

export const updateOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.orderId);
  if (!order) throw NotFound(res);

  await Order.findByIdAndUpdate(req.params.orderId, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).send({ status: "success", data: order });
});

export const removeOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.orderId);

  if (!order) throw NotFound(res);

  order.remove();
  res.status(204).send({ status: "success", message: "Sipariş silindi" });
});

export const payment = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.orderId);
  if (!order) throw NotFound(res);

  order.isPaid = true;
  order.paidAt = Date.now();

  if (req.body.status) {
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };
  } else {
    order.paymentResult = {
      id: order.id,
      status: 200,
      update_time: Date.now(),
      email_address: "mastermallano@gmail.com",
    };
  }

  await order.save();

  const updatedorder = await Order.findById(req.params.orderId);
  res.status(201).send({ status: "success", data: updatedorder });
});

export const deliverOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.orderId);
  if (!order) throw NotFound(res);

  order.isDelivered = true;
  order.deliveredAt = Date.now();
  await order.save();

  const updatedorder = await Order.findById(req.params.orderId);
  res.status(201).send({ status: "success", data: updatedorder });
});

import asyncHandler from "../middlewares/async";
import User from "../models/UserModel";
import { NotFound } from "../utilis/NotFound";

export const getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).send({ status: "success", data: res.advanceResults });
});

export const createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).send({ status: "success", data: user });
});

export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) throw NotFound(res);
  res.status(200).send({ status: "success", data: user });
});

export const updateUser = asyncHandler(async (req, res, next) => {
  const editUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!editUser) throw NotFound(res);

  const updatedUser = await User.findById(req.params.id);
  res.status(201).send({ status: "success", data: updatedUser });
});

export const removeUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) throw NotFound(res);

  await user.remove();
  res
    .status(204)
    .send({ status: "success", message: "User Deleted Successfully" });
});

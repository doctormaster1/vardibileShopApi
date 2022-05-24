import { Router } from "express";

import advanceResults from "../middlewares/advanceResults";
import User from "../models/UserModel";
import {
  getUsers,
  createUser,
  getUser,
  updateUser,
  removeUser,
} from "../controllers/UserController";
import { protect } from "../middlewares/auth";

const router = Router();

router.use(protect);

router.route("/").get(advanceResults(User), getUsers).post(createUser);
router.route("/:id").get(getUser).put(updateUser).delete(removeUser);

export default router;

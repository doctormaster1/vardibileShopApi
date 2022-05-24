import { Router } from "express";

import {
  RegisterUser,
  verifyEmail,
  login,
} from "../controllers/AuthController";

const router = Router();

router.route("/register").post(RegisterUser);
router.route("/login").post(login);
router.route("/verify").post(verifyEmail);

export default router;

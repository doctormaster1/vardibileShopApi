import { Router } from "express";

import { RegisterUser } from "../controllers/AuthController";

const router = Router();

router.route("/register").post(RegisterUser);
router.route("/login").post();
router.route("/verify").post();

export default router;

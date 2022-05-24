import jwt from "jsonwebtoken";
import { createError } from "./error";

export const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    if (error.name === "TokenExpiredError")
      throw createError(401, "Token geçersiz");
    throw error;
  }
};

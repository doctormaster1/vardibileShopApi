import { verifyToken } from "../utilis/jwt";
import asyncHandle from "./async";
import User from "../models/UserModel";

export const protect = asyncHandle(async (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (!(authorization && authorization.toLowerCase().startWith("bearer")))
    throw res.status(401).send("İzinsiz");

  const token = authorization.split(" ")[1];
  const decodeToken = verifyToken(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decodeToken._id);
  next();
});

export const permission = (role) => (req, res, next) => {
  if (role !== req.user.role) throw res.status(401).send("Yetkisiz kullanıcı");
  next();
};

import jwt from "jsonwebtoken";
import crypto from "crypto";
import client from "../config/redis";

export const genToken = async (id) => {
  const accessToken = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

  const md5Hasher = crypto.createHmac("md5", process.env.SECRET);
  const hash = md5Hasher.update(accessToken).digest("hex");

  const refreshToken = jwt.sign({ hash }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_REFRESH_EXPIRATION,
  });

  const token = { accessToken, refreshToken };

  const data = await client.get(id);
  if (data) await client.del(id);

  await client.set(id, JSON.stringify(token));
  return JSON.stringify(token);
};

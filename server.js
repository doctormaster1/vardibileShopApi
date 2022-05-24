// Importing Modules
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";

// Importing Custom Middlewares
import { unknownEndpoint } from "./middlewares/unknownEndpoints";
import { errorHandler } from "./middlewares/errorHandler";

// Importing Databases
import connectDB from "./config/db";
import client from "./config/redis";

// Importing Router
import authRoute from "./routes/AuthRoute";
import userRouter from "./routes/UserRoute";
import productRouter from "./routes/ProductRoute";
import reviewRoute from "./routes/ReviewRoute";
import categoryRoute from "./routes/CategoryRoute";
import orderRoute from "./routes/OrderRoute";

// Config
dotenv.config({ path: "./config/.env" });
const server = express();
const PORT = process.env.PORT || 5000;

// Connected Databases
await connectDB();
await client.connect();

// Middlewares
server.use(express.json());
server.use(
  fileUpload({
    useTempFiles: true,
  })
);
server.use(cors({ origin: process.env.WHITELIST_URL }));

// Routing
server.use("/api/auth", authRoute);
server.use("/api/user", userRouter);
server.use("/api/product", productRouter);
server.use("/api/review", reviewRoute);
server.use("/api/category", categoryRoute);
server.use("/api/order", orderRoute);

server.get("/", (req, res) => {
  res.sendStatus(200);
});

server.use(unknownEndpoint);
server.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Api Server Is Running! (${PORT})`);
});

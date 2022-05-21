// Importing modules
import express from "express";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";

import connectDB from "./config/db";

// Importing Router
import userRouter from "./routes/UserRoute";
import productRouter from "./routes/ProductRoute";
import reviewRoute from "./routes/ReviewRoute";
import categoryRoute from "./routes/CategoryRoute";
import orderRoute from "./routes/OrderRoute";

// Config
dotenv.config({ path: "./config/.env" });
const server = express();
const PORT = process.env.PORT || 5000;
connectDB();

// Middlewares
server.use(express.json());
server.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Routing
server.use("/api/user", userRouter);
server.use("/api/product", productRouter);
server.use("/api/review", reviewRoute);
server.use("/api/category", categoryRoute);
server.use("/api/order", orderRoute);

server.get("/", (req, res) => {
  res.sendStatus(200);
});

server.listen(PORT, () => {
  console.log(`Api Server Is Running! (${PORT})`);
});

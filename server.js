import colors from "colors";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import connectDb from "./config/db.js";
import asyncRoutes from "./routes/asyncRoutes.js";
import errorHandelingRoutes from "./routes/errorHandelingRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

// I have used MONGO DB for CRUD on categories.
// If you want to test user or categories endpoints please replace the MONGO_URL in .env file

//env config
dotenv.config();

//mongo db connection
connectDb();

// rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// async-operations to download content from Multiple URl's at once
app.use("/api/v1/async-operations", asyncRoutes);

// error handeling. Add an api and it will handle all type of errors with logging.
app.use("/api/v1/error-handeling", errorHandelingRoutes);

// file reading system
app.use("/api/v1/files", fileRoutes);

// user register and login. In this we'll simply login and register, after logging in we'll get token. On the base
// of token we'll handle CRUD Operations on categories and use the token Authentication in categories and we'll handle roles.
app.use("/api/v1/user", userRoutes);

// Categories CRUD and token authentication
app.use("/api/v1/category", categoryRoutes);

//rest api
app.get("/", (req, res) => {
  res.send({ message: " Welcome to node js - Ikonic" });
});

// PORT
const PORT = process.env.PORT || 8080;

// Listen
app.listen(PORT, () => {
  console.log(
    colors.bgCyan.white(
      `Server running on ${process.env.DEV_MODE} mode on port ${PORT}`
    )
  );
});

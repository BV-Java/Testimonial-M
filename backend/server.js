import express from "express";
import { ENV_VARS } from "./ENV/ENV_VARS.js";
import errorHandler from "./Middlewares/errorHandler.middleware.js";
import cookieParser from "cookie-parser";
import userRoutes from "./Routes/user.routes.js";
import connectToDatabase from "./Database/MongoDb.js";
import projectRoutes from "./Routes/project.routes.js";
import connectCloudinary from "./Database/Cloudinary.js";
import reviewRoutes from "./Routes/reviews.routes.js";
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const port = ENV_VARS.port;

app.use("/api/users/v1", userRoutes);
app.use("/api/projects/v1", projectRoutes);
app.use("/api/reviews/v1", reviewRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
  connectToDatabase();
  connectCloudinary();
});

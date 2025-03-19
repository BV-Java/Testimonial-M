import express from "express";
import { ENV_VARS } from "./ENV/ENV_VARS.js";
import errorHandler from "./Middlewares/errorHandler.middleware.js";
import cookieParser from "cookie-parser";
import userRoutes from "./Routes/user.routes.js";
import connectToDatabase from "./Database/MongoDb.js";
import projectRoutes from "./Routes/project.routes.js";
import connectCloudinary from "./Database/Cloudinary.js";
import reviewRoutes from "./Routes/reviews.routes.js";
import path from "path";
const app = express();

const __dirname = path.resolve();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const port = ENV_VARS.port;

app.use("/api/users/v1", userRoutes);
app.use("/api/projects/v1", projectRoutes);
app.use("/api/reviews/v1", reviewRoutes);

app.use(errorHandler);

if (ENV_VARS.nodeEnv === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
  connectToDatabase();
  connectCloudinary();
});

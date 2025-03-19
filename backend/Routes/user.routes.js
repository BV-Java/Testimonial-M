import express from "express";
import {
  getMe,
  login,
  register,
  signOut,
} from "../Controllers/user.controller.js";
import protectRoute from "../Middlewares/protectRoute.middleware.js";

const userRoutes = express.Router();

// Routes
userRoutes.post("/sign-up", register);
userRoutes.post("/sign-in", login);
userRoutes.post("/sign-out", protectRoute, signOut);
userRoutes.get("/me", protectRoute, getMe);

export default userRoutes;

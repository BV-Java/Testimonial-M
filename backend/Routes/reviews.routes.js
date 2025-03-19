import express from "express";
import protectRoute from "../Middlewares/protectRoute.middleware.js";
import {
  addReview,
  getReviews,
  startOrStopReviews,
  verifyEmail,
  verifyOtp,
} from "../Controllers/reviews.controller.js";

const reviewRoutes = express.Router();

reviewRoutes.post("/regulate/:id", protectRoute, startOrStopReviews);
reviewRoutes.post("/verify/:email", verifyEmail);
reviewRoutes.post("/verify-otp/:otp", verifyOtp);
reviewRoutes.post("/add-review/:id", addReview);
reviewRoutes.get("/get-reviews/:id", protectRoute, getReviews);

export default reviewRoutes;

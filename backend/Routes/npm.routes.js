import express from "express";
import {
  addReview,
  getReview,
  getAllReviews,
  reportSus,
  normalReport,
  getAnalyticsOfTestimonialForTheProject,
  getTopReviews,
  getSusReviews,
  getBadReviews,
  getReviewsByRating,
  deleteReview,
  editReview,
  getProjectDetailsByPasscode,
} from "../Controllers/npm.controller.js";

const npmRoutes = express.Router();

// REVIEW ROUTES
npmRoutes.post("/add-review", addReview);
npmRoutes.get("/get-review", getReview);
npmRoutes.get("/get-all-reviews/:passcode", getAllReviews);
npmRoutes.post("/report-sus", reportSus);
npmRoutes.post("/normal-report", normalReport);
npmRoutes.get(
  "/get-analytics/:passcode",
  getAnalyticsOfTestimonialForTheProject
);
npmRoutes.get("/get-top-reviews/:passcode", getTopReviews);
npmRoutes.get("/get-sus-reviews/:passcode", getSusReviews);
npmRoutes.get("/get-bad-reviews/:passcode", getBadReviews);
npmRoutes.get("/get-reviews-by-rating", getReviewsByRating);
npmRoutes.delete("/delete-review", deleteReview);
npmRoutes.put("/edit-review", editReview);

// PROJECT ROUTE
npmRoutes.get("/get-project-details/:passcode", getProjectDetailsByPasscode);

export default npmRoutes;

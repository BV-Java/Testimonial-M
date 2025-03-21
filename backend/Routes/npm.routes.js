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
npmRoutes.post("/add-review/:passcode", addReview);
npmRoutes.get("/get-review", getReview);
npmRoutes.get("/get-all-reviews/:passcode", getAllReviews);
npmRoutes.post("/report-sus/:passcode", reportSus);
npmRoutes.post("/normal-report/:passcode", normalReport);
npmRoutes.get(
  "/get-analytics/:passcode",
  getAnalyticsOfTestimonialForTheProject
);
npmRoutes.get("/get-top-reviews/:passcode", getTopReviews);
npmRoutes.get("/get-sus-reviews/:passcode", getSusReviews);
npmRoutes.get("/get-bad-reviews/:passcode", getBadReviews);
npmRoutes.get("/get-reviews-by-rating", getReviewsByRating);
npmRoutes.delete("/delete-review/:passcode", deleteReview);
npmRoutes.put("/edit-review/:passcode", editReview);

// PROJECT ROUTE
npmRoutes.get("/get-project-details/:passcode", getProjectDetailsByPasscode);

export default npmRoutes;

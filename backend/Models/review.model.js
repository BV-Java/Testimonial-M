import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  reviewerEmail: { type: String, required: [true, "Email is Required"] },
  isVerified: { type: Boolean, default: false },
  verificationExpiry: {
    type: Number,
    default: 0,
  },
  otp: { type: String },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Projects" },
  name: { type: String },
  review: { type: String },
  rating: { type: Number },
  createdAt: { type: Date, default: Date.now() },
  isReviewed: { type: Boolean, default: false },
  isSus: { type: Boolean, default: false },
  isReported: { type: Boolean, default: false },
});

export const ReviewModel =
  mongoose.models.Review || mongoose.model("Review", reviewSchema);

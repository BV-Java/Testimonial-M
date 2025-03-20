import { ReviewModel } from "../models/review.model.js";
import { ProjectModel } from "../models/project.model.js";
import mongoose from "mongoose";

export const addReview = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { reviewerEmail, projectId, name, review, rating } = req.body;

    if (!reviewerEmail || !projectId || !review || !rating) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const project = await ProjectModel.findById(projectId);
    if (!project)
      return res.status(404).json({ message: "Project not found." });

    const newReview = await ReviewModel.create(
      [
        {
          reviewerEmail,
          project: projectId,
          name,
          review,
          rating,
        },
      ],
      { session }
    );

    res
      .status(201)
      .json({ message: "Review Added Successfully", data: newReview });

    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};

export const getReview = async (req, res) => {
  try {
    const { passcode, passkey, reviewerEmail } = req.body;

    if (!passcode || !passkey || !reviewerEmail) {
      return res.status(400).json({
        success: false,
        message: "Passcode, passkey, and reviewerEmail are required",
      });
    }

    const project = await ProjectModel.findOne({ passcode, passkey });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Invalid passcode or passkey. Project not found",
      });
    }

    const review = await ReviewModel.findOne({
      project: project._id,
      reviewerEmail,
    }).populate("project");

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found for this project and email",
      });
    }

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (error) {
    console.error("Error in getReview:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const { passcode } = req.params;
    const { passkey } = req.body;

    if (!passcode || !passkey) {
      return res.status(400).json({
        success: false,
        message: "Passcode and passkey are required",
      });
    }

    const project = await ProjectModel.findOne({ passcode, passkey });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Invalid passcode or passkey. Project not found.",
      });
    }

    const reviews = await ReviewModel.find({ project: project._id }).populate(
      "project"
    );

    res.status(200).json({
      success: true,
      message: "All Reviews Fetched",
      data: reviews,
    });
  } catch (err) {
    console.error("Error in getAllReviews:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

export const reportSus = async (req, res) => {
  try {
    const { reviewerEmail, projectId } = req.body;

    if (!reviewerEmail || !projectId) {
      return res.status(400).json({
        success: false,
        message: "Both reviewerEmail and projectId are required.",
      });
    }

    const review = await ReviewModel.findOne({
      reviewerEmail,
      project: projectId,
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found for the given project and email.",
      });
    }

    review.isSus = true;
    review.isReported = true;
    await review.save();

    res.status(200).json({
      success: true,
      message: "Marked as suspicious successfully.",
      data: review,
    });
  } catch (err) {
    console.error("Error in reportSus:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

export const normalReport = async (req, res) => {
  try {
    const { reviewerEmail, projectId } = req.body;

    if (!reviewerEmail || !projectId) {
      return res.status(400).json({
        success: false,
        message: "Both reviewerEmail and projectId are required.",
      });
    }

    const review = await ReviewModel.findOne({
      reviewerEmail,
      project: projectId,
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found for the given project and email.",
      });
    }

    review.isSus = false;
    review.isReported = false;
    await review.save();

    res.status(200).json({
      success: true,
      message: "Report removed successfully.",
      data: review,
    });
  } catch (err) {
    console.error("Error in normalReport:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

export const getAnalyticsOfTestimonialForTheProject = async (req, res) => {
  try {
    const { passcode } = req.params;
    const { passkey } = req.body;

    if (!passcode || !passkey) {
      return res.status(400).json({
        success: false,
        message: "Passcode and passkey are required",
      });
    }

    const project = await ProjectModel.findOne({ passcode, passkey });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Invalid passcode or passkey. Project not found.",
      });
    }

    const reviews = await ReviewModel.find({ project: project._id });

    const total = reviews.length;
    const totalRatingPoints = reviews.reduce(
      (acc, r) => acc + (r.rating || 0),
      0
    );
    const averageRating = totalRatingPoints / (total || 1);

    const ratingBreakdown = {
      oneStar: reviews.filter((r) => r.rating === 1).length,
      twoStars: reviews.filter((r) => r.rating === 2).length,
      threeStars: reviews.filter((r) => r.rating === 3).length,
      fourStars: reviews.filter((r) => r.rating === 4).length,
      fiveStars: reviews.filter((r) => r.rating === 5).length,
    };

    const ratingPercentages = {
      oneStar: ((ratingBreakdown.oneStar / total) * 100).toFixed(1) + "%",
      twoStars: ((ratingBreakdown.twoStars / total) * 100).toFixed(1) + "%",
      threeStars: ((ratingBreakdown.threeStars / total) * 100).toFixed(1) + "%",
      fourStars: ((ratingBreakdown.fourStars / total) * 100).toFixed(1) + "%",
      fiveStars: ((ratingBreakdown.fiveStars / total) * 100).toFixed(1) + "%",
    };

    const susCount = reviews.filter((r) => r.isSus).length;
    const badReviews = reviews.filter((r) => r.rating <= 2).length;
    const topReviews = reviews.filter((r) => r.rating >= 4).length;

    const firstReviewDate = reviews.length
      ? new Date(Math.min(...reviews.map((r) => new Date(r.createdAt))))
      : null;

    const latestReviewDate = reviews.length
      ? new Date(Math.max(...reviews.map((r) => new Date(r.createdAt))))
      : null;

    const uniqueReviewers = new Set(reviews.map((r) => r.reviewerEmail)).size;

    const sentiment = {
      positive: reviews.filter((r) => r.rating >= 4).length,
      neutral: reviews.filter((r) => r.rating === 3).length,
      negative: reviews.filter((r) => r.rating <= 2).length,
    };

    res.status(200).json({
      success: true,
      message: "Advanced Analytics Fetched",
      data: {
        totalReviews: total,
        totalRatingPoints,
        averageRating: averageRating.toFixed(2),
        ratingBreakdown,
        ratingPercentages,
        susCount,
        susPercentage: ((susCount / total) * 100).toFixed(1) + "%",
        badReviews,
        topReviews,
        firstReviewDate,
        latestReviewDate,
        uniqueReviewers,
        sentiment,
      },
    });
  } catch (err) {
    console.error("Error in getAnalyticsOfTestimonialForTheProject:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

export const getTopReviews = async (req, res) => {
  try {
    const { passcode } = req.params;
    const { passkey } = req.body;

    if (!passcode || !passkey) {
      return res.status(400).json({
        success: false,
        message: "Passcode and passkey are required",
      });
    }

    const project = await ProjectModel.findOne({ passcode, passkey });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Invalid passcode or passkey. Project not found.",
      });
    }

    const reviews = await ReviewModel.find({
      project: project._id,
      rating: { $gte: 4 },
    });

    res.status(200).json({
      success: true,
      message: "Top Reviews Fetched",
      data: reviews,
    });
  } catch (err) {
    console.error("Error in getTopReviews:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

export const getSusReviews = async (req, res) => {
  try {
    const { passcode } = req.params;
    const { passkey } = req.body;

    if (!passcode || !passkey) {
      return res.status(400).json({
        success: false,
        message: "Passcode and passkey are required",
      });
    }

    const project = await ProjectModel.findOne({ passcode, passkey });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Invalid passcode or passkey. Project not found.",
      });
    }

    const reviews = await ReviewModel.find({
      project: project._id,
      isSus: true,
    });

    res.status(200).json({
      success: true,
      message: "Suspicious Reviews Fetched",
      data: reviews,
    });
  } catch (err) {
    console.error("Error in getSusReviews:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

export const getBadReviews = async (req, res) => {
  try {
    const { passcode } = req.params;
    const { passkey } = req.body;

    if (!passcode || !passkey) {
      return res.status(400).json({
        success: false,
        message: "Passcode and passkey are required",
      });
    }

    const project = await ProjectModel.findOne({ passcode, passkey });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Invalid passcode or passkey. Project not found.",
      });
    }

    const reviews = await ReviewModel.find({
      project: project._id,
      rating: { $lte: 2 },
    });

    res.status(200).json({
      success: true,
      message: "Bad Reviews Fetched",
      data: reviews,
    });
  } catch (err) {
    console.error("Error in getBadReviews:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

export const getReviewsByRating = async (req, res) => {
  try {
    const { passcode, rating, passkey } = req.query;

    if (!passcode || !passkey) {
      return res.status(400).json({
        success: false,
        message: "Passcode and passkey are required",
      });
    }

    if (!rating || isNaN(Number(rating))) {
      return res.status(400).json({
        success: false,
        message: "Invalid rating parameter",
        valueReceived: rating,
      });
    }

    const numericRating = parseInt(rating);

    const project = await ProjectModel.findOne({ passcode, passkey });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Invalid passcode or passkey. Project not found.",
      });
    }

    const reviews = await ReviewModel.find({
      project: project._id,
      rating: numericRating,
    }).populate("project");

    res.status(200).json({
      success: true,
      message: "Reviews fetched by rating",
      data: reviews,
    });
  } catch (err) {
    console.error("Error in getReviewsByRating:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { reviewerEmail, passcode, passkey } = req.body;

    if (!reviewerEmail || !passcode || !passkey) {
      return res.status(400).json({
        success: false,
        message: "Reviewer email, passcode, and passkey are required.",
      });
    }

    const project = await ProjectModel.findOne({ passcode, passkey });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Invalid passcode or passkey. Project not found.",
      });
    }

    const review = await ReviewModel.findOne({
      reviewerEmail,
      project: project._id,
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

    await ReviewModel.deleteOne({ _id: review._id });

    res.status(200).json({
      success: true,
      message: "Review deleted successfully.",
    });
  } catch (err) {
    console.error("Error in deleteReview:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

export const editReview = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { reviewerEmail, passcode, passkey } = req.body;

    if (!reviewerEmail || !passcode || !passkey) {
      return res.status(400).json({
        message: "Reviewer email, passcode, and passkey are required.",
      });
    }

    const project = await ProjectModel.findOne({ passcode, passkey });
    if (!project) {
      return res
        .status(404)
        .json({ message: "Invalid passcode or passkey. Project not found." });
    }

    const review = await ReviewModel.findOne({
      reviewerEmail,
      project: project._id,
    }).session(session);

    if (!review) {
      return res.status(404).json({ message: "Review not found." });
    }

    const updatedReview = await ReviewModel.findByIdAndUpdate(
      review._id,
      req.body,
      { new: true }
    ).populate("project");

    await session.commitTransaction();
    session.endSession();

    res
      .status(200)
      .json({ message: "Review updated successfully.", data: updatedReview });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export const getProjectDetailsByPasscode = async (req, res) => {
  try {
    const { passcode } = req.params;
    const { passkey } = req.query;

    if (!passkey) {
      return res.status(400).json({ message: "Passkey is required." });
    }

    const project = await ProjectModel.findOne({ passcode, passkey });

    if (!project) {
      return res
        .status(404)
        .json({ message: "Invalid passcode or passkey. Project not found." });
    }

    res.status(200).json({ message: "Project Details Fetched", data: project });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

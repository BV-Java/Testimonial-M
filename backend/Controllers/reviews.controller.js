import mongoose from "mongoose";
import { ProjectModel } from "../Models/project.model.js";
import { ReviewModel } from "../Models/review.model.js";
import generateOTP from "../utils/generateOtp.js";
import transporter from "../Config/nodemailer.js";
import { ENV_VARS } from "../ENV/ENV_VARS.js";
import { Password_Template } from "../utils/mailTemplate.js";
import bannedWords from "../Config/Check.js";

export const startOrStopReviews = async (req, res, next) => {
  const { state } = req.body;
  const { id } = req.params;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const project = await ProjectModel.findById(id).select(
      "response projectName"
    );
    if (!project) {
      const error = new Error("No Such Project");
      error.statusCode = 400;
      throw error;
    }

    console.log(project);

    project.response = state ? true : false;
    await project.save({ session });

    res.status(200).json({
      success: true,
      message: `Reviews ${state ? "started" : "stopped"} Successfully`,
      project,
    });
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const { id } = req.body;
  try {
    const { email } = req.params;

    const project = await ProjectModel.findById(id);
    if (!project) {
      const error = new Error("No Such Project");
      error.statusCode = 400;
      throw error;
    }

    const otp = generateOTP();
    const existingUser = await ReviewModel.findOne({
      reviewerEmail: email,
      project: id,
    });
    if (existingUser) {
      console.log("Existing User");

      // ! old User
      if (existingUser.isVerified) {
        res.status(200).json({
          success: true,
          message: "User already verified",
          isReviewed: existingUser.isReviewed,
          review: {
            review: existingUser.review,
            rating: existingUser.rating,
            name: existingUser.name,
          },
        });
      } else {
        existingUser.otp = otp;
        existingUser.verificationExpiry = Date.now() + 5 * 60 * 1000;
        await existingUser.save({ session });

        await transporter.sendMail({
          from: ENV_VARS.admin_email,
          to: email,
          subject: "OTP for Review",
          html: Password_Template.replace("{{otp}}", otp).replace(
            "{{email}}",
            email
          ),
        });
        res.status(201).json({
          success: false,
          message: "Email Sent",
        });
      }
    } else {
      console.log("New User");

      // ! new User
      const expiry = Date.now() + 5 * 60 * 1000;
      const newReviewer = await ReviewModel.create(
        [
          {
            reviewerEmail: email,
            otp,
            verificationExpiry: expiry,
            project: id,
          },
        ],
        {
          session,
        }
      );

      await transporter.sendMail({
        from: ENV_VARS.admin_email,
        to: email,
        subject: "OTP for Review",
        html: Password_Template.replace("{{otp}}", otp).replace(
          "{{email}}",
          email
        ),
      });
      res.status(201).json({
        success: false,
        message: "Email Sent",
      });
    }

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const verifyOtp = async (req, res, next) => {
  const { otp } = req.params;
  const { email, id } = req.body;
  console.log(otp);
  console.log(email);

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const project = await ProjectModel.findById(id);
    if (!project) {
      const error = new Error("No Such Project");
      error.statusCode = 400;
      throw error;
    }

    const user = await ReviewModel.findOne({
      reviewerEmail: email,
      project: id,
    });

    console.log(user);

    if (otp !== user.otp) {
      const error = new Error("Invalid OTP");
      error.statusCode = 400;
      throw error;
    }

    console.log("Current Time:", Date.now());
    console.log(
      "OTP Expiry Time:",
      new Date(user.verificationExpiry).getTime()
    );
    console.log(Date.now() > new Date(user.verificationExpiry).getTime());

    if (!user.verificationExpiry || Date.now() > user.verificationExpiry) {
      const error = new Error("OTP Expired");
      error.statusCode = 400;
      throw error;
    }

    user.isVerified = true;
    user.otp = "";

    await user.save({ session });

    res.status(200).json({
      success: true,
      message: "OTP Verified",
      isVerified: true,
      isReviewed: user.isReviewed,
      review: { review: user.review, rating: user.rating, name: user.name },
    });

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const addReview = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const id = req.params.id;
  const { name, review, rating, email } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid Project ID");
    }

    if (rating === 0) {
      const error = new Error("Please Rate");
      error.statusCode = 400;
      throw error;
    }

    const project = await ProjectModel.findById(id);

    console.log("Project", project);

    if (!project) {
      const error = new Error("No Such Project");
      error.statusCode = 400;
      throw error;
    }

    if (project.status === "Inactive") {
      const error = new Error("Project is Inactive");
      error.statusCode = 400;
      throw error;
    }

    if (!project.response) {
      const error = new Error("Reviews Stopped");
      error.statusCode = 400;
      throw error;
    }

    const reviewer = await ReviewModel.findOne({
      reviewerEmail: email,
      project: id,
    });

    if (!reviewer) {
      const error = new Error("Email Not Verified");
      error.statusCode = 400;
      throw error;
    }

    if (reviewer.isVerified === false) {
      const error = new Error("Email Not Verified");
      error.statusCode = 400;
      throw error;
    }

    if (reviewer.review) {
      const error = new Error("Already Reviewed");
      error.statusCode = 400;
      throw error;
    }

    const reviewLower = review.toLowerCase();
    const containsBannedWord = bannedWords.some((word) => {
      const regex = new RegExp(`\\b${word}\\b`, "gi"); // Match whole words only
      return regex.test(reviewLower);
    });

    if (containsBannedWord) {
      const error = new Error("Review contains prohibited words.");
      error.statusCode = 400;
      throw error;
    }

    reviewer.name = name;
    reviewer.review = review;
    reviewer.rating = rating;
    reviewer.project = id;
    reviewer.isReviewed = true;
    await reviewer.save({ session });

    res.status(200).json({
      success: true,
      message: "Review Added Successfully",
      review,
    });

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const getReviews = async (req, res, next) => {
  const { id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = 9;
  const skip = (page - 1) * limit;
  const filter = req.query.filter || "All"; // ✅ Get filter type

  let query = { project: id };

  // ✅ Apply filtering based on `dropDown` value
  if (filter === "Reported") query.isReported = true;
  else if (filter === "Sus") query.isSus = true;

  try {
    const totalReviews = await ReviewModel.countDocuments(query);
    const totalPages = Math.ceil(totalReviews / limit);

    const reviews = await ReviewModel.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews,
      totalReviews,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    next(error);
  }
};

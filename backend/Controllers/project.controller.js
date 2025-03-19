import { ProjectModel } from "../Models/project.model.js";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import crypto from "crypto";
import { ReviewModel } from "../Models/review.model.js";

export const createProject = async (req, res, next) => {
  const session = await mongoose.startSession();
  const { projectName, category, organization, description } = req.body;
  let logo = req.file;
  console.log("Logo details", logo);

  session.startTransaction();
  const userId = req.user._id;
  let public_id = "";
  try {
    if (logo) {
      const response = await cloudinary.uploader.upload(logo.path, {
        resource_type: "image",
      });
      logo = response.secure_url;
      public_id = response.public_id;
    }

    if (!logo) {
      const error = new Error("Please Upload the Logo");
      error.statusCode = 400;
      throw error;
    }

    const newProject = await ProjectModel.create(
      [
        {
          projectName,
          category,
          organization,
          description,
          userId,
          public_id,
          logo,
        },
      ],
      {
        session,
      }
    );

    await session.commitTransaction();
    res.status(201).json({
      success: true,
      message: "Project Created Successfully",
      project: newProject[0],
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  }
};

export const getProject = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  try {
    const project = await ProjectModel.findById(id);

    if (!project) {
      const error = new Error("Project Not Found");
      error.statusCode = 404;
      throw error;
    }

    if (project.userId.toString() !== userId.toString()) {
      const error = new Error("Unauthorized Entry : You are not the owner");
      error.statusCode = 401;
      throw error;
    }

    const reviews = await ReviewModel.find({ project: id });
    const totalReviews = reviews.length;
    const totalRating = reviews.reduce(
      (sum, review) => sum + (review.rating || 0),
      0
    );
    const averageRating =
      totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : 0;
    project.review = averageRating;
    project.reviewsCount = reviews?.length;
    await project.save();

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllProjects = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const projects = await ProjectModel.find({ userId });

    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    next(error);
  }
};

export const getProjectReview = async (req, res, next) => {
  try {
    // ! This function need passkey to get the value, so we need to implement the logic to get the passkey in priority
    const { code } = req.params;
    console.log("Code", code);

    const project = await ProjectModel.findOne({ passcode: code }).select(
      "logo projectName organization category description"
    );

    if (!project) {
      const error = new Error("Project Not Found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    next(error);
  }
};

export const createPasscode = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const project = await ProjectModel.findOne({ userId, _id: id });

    const code = crypto.randomBytes(21).toString("hex").slice("0", 21);
    console.log("Code", code);
    project.passcode = code;
    await project.save({ session });

    res.status(200).json({
      success: true,
      message: "Passcode Created Successfully",
      passcode: code,
      projectName: project.projectName,
    });
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    next(error);
  }
};

export const createPasskey = async (req, res, next) => {
  const session = await mongoose.startSession();
  await session.startTransaction();
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const project = await ProjectModel.findOne({ userId, _id: id });

    const key =
      crypto.randomBytes(4).toString("hex") +
      "-" +
      crypto.randomBytes(2).toString("hex") +
      "-" +
      crypto.randomBytes(2).toString("hex") +
      "-" +
      crypto.randomBytes(2).toString("hex") +
      crypto.randomBytes(4).toString("hex");

    project.passkey = key;
    await project.save({ session });

    await session.commitTransaction();
    res.status(200).json({
      success: true,
      message: "Passkey created Successfully",
      passkey: key,
      projectName: project.projectName,
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  }
};

export const createUrl = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const project = await ProjectModel.findOne({ userId, _id: id });

    if (!project.passcode) {
      const error = new Error(
        "Please generate the passcode for using this feature"
      );
      error.statusCode = 400;
      throw error;
    }

    project.publicUrl = true;
    await project.save({ session });

    res.status(200).json({
      success: true,
      message: "Url Generated",
    });

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    next(error);
  }
};

export const getGenerated = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const project = await ProjectModel.findOne({ userId, _id: id }).select(
      "passkey passcode publicUrl"
    );

    // console.log(project?.publicUrl || false);

    res.status(200).json({
      success: true,
      project: {
        publicUrl: project?.publicUrl ? project.publicUrl : false,
        passcode: project?.passcode || false,
        passkey: project?.passkey || false,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const project = await ProjectModel.findOneAndDelete({
      _id: id,
      userId,
    }).session(session);

    if (!project) {
      const error = new Error("Prohibited : Action Not Allowed");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Project Deleted Successfully",
    });

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  let logo = req.file;
  console.log("New Logo Details", logo);

  try {
    const { id } = req.params;
    const userId = req.user._id;
    console.log(req.body);
    const newPublicId = null;
    const project = await ProjectModel.findOne({ _id: id, userId });

    if (logo) {
      await cloudinary.uploader.destroy(project.public_id);
      console.log(1);

      const uploadRes = await cloudinary.uploader.upload(logo.path, {
        resource_type: "image",
      });
      console.log(1);

      logo = uploadRes.secure_url;
      project.public_id = uploadRes.public_id;
    }

    project.projectName = req.body.projectName || project.projectName;
    project.category = req.body.category || project.category;
    project.organization = req.body.organization || project.organization;
    project.description = req.body.description || project.description;
    project.logo = logo ? logo : project.logo;
    project.status = req.body.status || project.status;

    if (req.body.status === "Inactive") {
      project.passcode = null;
      project.passkey = null;
      project.publicUrl = false;
    }

    await project.save({ session });
    await session.commitTransaction();

    res.status(200).json({
      success: true,
      message: "Project Updated Successfully",
      project,
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  }
};

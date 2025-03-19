import express from "express";
import protectRoute from "../Middlewares/protectRoute.middleware.js";
import {
  createPasscode,
  createPasskey,
  createProject,
  createUrl,
  deleteProject,
  getAllProjects,
  getGenerated,
  getProject,
  getProjectReview,
  updateProject,
} from "../Controllers/project.controller.js";
import upload from "../Middlewares/multer.middlware.js";

const projectRoutes = express.Router();

projectRoutes.get("/projects", protectRoute, getAllProjects);
projectRoutes.get("/projects/:id", protectRoute, getProject);
projectRoutes.get("/projects-review/:code", getProjectReview);
projectRoutes.post(
  "/create",
  protectRoute,
  upload.single("logo"),
  createProject
);
projectRoutes.get("/search/:id");
projectRoutes.delete("/delete/:id", protectRoute, deleteProject);
projectRoutes.patch(
  "/edit/:id",
  protectRoute,
  upload.single("logo"),
  updateProject
);
projectRoutes.post("/passcode/:id", protectRoute, createPasscode);
projectRoutes.post("/passkey/:id", protectRoute, createPasskey);
projectRoutes.post("/generate-Url/:id", protectRoute, createUrl);
projectRoutes.get("/generated/:id", protectRoute, getGenerated);

export default projectRoutes;

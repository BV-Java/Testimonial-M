import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    review: { type: Number, default: 0 },
    projectName: { type: String, required: [true, "Project Name is Required"] },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    category: {
      type: String,
      enum: ["Business", "Personal"],
      required: [true, "Category is Required"],
    },
    reviewsCount: { type: Number, default: 0 },
    organization: {
      type: String,
      required: [true, "Organization is Required"],
    },
    logo: { type: String, required: true },
    description: {
      type: String,
      required: [true, "Description is Required"],
      maxLength: [200, "Maximum Character Limit Reached."],
      minLength: [100, "Enter Minimum 100 characters"],
    },
    response: { type: Boolean, default: true },
    public_id: { type: String },
    passcode: { type: String, unique: true, sparse: true },
    passkey: { type: String, unique: true, sparse: true },
    publicUrl: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ProjectModel = mongoose.model("Projects", projectSchema);

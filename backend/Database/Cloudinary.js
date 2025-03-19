import { v2 as cloudinary } from "cloudinary";
import { ENV_VARS } from "../ENV/ENV_VARS.js";

const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: ENV_VARS.cloudinary_Cloud_Name,
    api_key: ENV_VARS.cloudinary_API_Key,
    api_secret: ENV_VARS.cloudinary_API_Secret,
  });
};

export default connectCloudinary;

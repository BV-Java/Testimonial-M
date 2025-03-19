import dotenv from "dotenv";
dotenv.config();

export const ENV_VARS = {
  port: process.env.PORT,
  mongoDb: process.env.MONGO_URI,
  secretKey: process.env.SECRET_KEY,
  expiresTime: process.env.EXPIRES_TIME,
  nodeEnv: process.env.NODE_ENV,
  cloudinary_API_Key: process.env.CLOUDINARY_API_KEY,
  cloudinary_API_Secret: process.env.CLOUDINARY_SECRET_KEY,
  cloudinary_Cloud_Name: process.env.CLOUDINARY_NAME,
  host: process.env.HOST,
  smtp_user: process.env.SMTP_USER,
  smtp_password: process.env.SMTP_PASSWORD,
  admin_password: process.env.ADMIN_PASSWORD,
  sender_email: process.env.SENDER_EMAIL,
  admin_email: process.env.ADMIN,
};

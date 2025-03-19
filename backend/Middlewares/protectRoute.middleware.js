import jwt from "jsonwebtoken";
import { ENV_VARS } from "../ENV/ENV_VARS.js";
import UserModel from "../Models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      const error = new Error("Unauthorized Entry");
      error.statusCode = 401;
      throw error;
    }

    const decode = jwt.verify(token, ENV_VARS.secretKey);

    if (!decode) {
      const error = new Error("Unauthorized Entry : Invalid Token");
      error.statusCode = 401;
      throw error;
    }

    const user = await UserModel.findById(decode.userId).select("-password");

    if (!user) {
      const error = new Error("Invalid User");
      error.statusCode = 400;
      throw error;
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default protectRoute;

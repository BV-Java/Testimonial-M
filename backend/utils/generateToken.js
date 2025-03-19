import jwt from "jsonwebtoken";
import { ENV_VARS } from "../ENV/ENV_VARS.js";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, ENV_VARS.secretKey, {
    expiresIn: ENV_VARS.expiresTime,
  });

  res.cookie("jwt", token, {
    maxAge: 1 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: ENV_VARS.nodeEnv !== "development",
  });

  return token;
};

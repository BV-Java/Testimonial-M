import mongoose from "mongoose";
import UserModel from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import validator from "validator";

//* Signup
export const register = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password } = req.body;

    if (!password) {
      const error = new Error("Password is Missing");
      error.statusCode = 400;
      throw error;
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      const error = new Error("User Already Existing");
      error.statusCode = 400;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create(
      [{ name, email, password: hashedPassword }],
      { session }
    );
    console.log("New User Id", newUser[0]._id);

    const token = generateToken(newUser[0]._id, res);

    res.status(201).json({
      success: true,
      message: "Account Created Successfully",
      user: newUser[0],
      token,
    });
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

//* Signin
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!password) {
      const error = new Error("Password is missing");
      error.statusCode = 400;
      throw error;
    }
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      const error = new Error(
        "No Such User - Please enter correct email and password"
      );
      error.statusCode = 400;
      throw error;
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      const error = new Error("Please enter correct password");
      error.statusCode = 400;
      throw error;
    }

    const token = generateToken(existingUser._id, res);

    res.status(201).json({
      success: true,
      message: "Logged In Successfully",
      user: existingUser,
      token,
    });
  } catch (error) {
    next(error);
  }
};

//* Signout
export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ success: true, message: "Logged out Successfully" });
  } catch (error) {
    next(error);
  }
};

// Me
export const getMe = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user._id);
    if (!user) {
      const error = new Error("Invalid User");
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

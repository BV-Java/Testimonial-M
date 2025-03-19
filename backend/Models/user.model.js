import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Username is required"],
    minLength: 2,
    maxLength: 25,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "User Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "User Password is required"],
    minLength: 6,
  },
});

const UserModel = mongoose.model("Users", userSchema);

export default UserModel;

import mongoose from "mongoose";
import { ENV_VARS } from "../ENV/ENV_VARS.js";

const connectToDatabase = async () => {
  try {
    const conn = await mongoose.connect(ENV_VARS.mongoDb);
    console.log(`Mongo Db Connected to ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error connecting to Database : ${error.message}`);
    process.exit(1);
  }
};

export default connectToDatabase;

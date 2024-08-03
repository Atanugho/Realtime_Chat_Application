import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"
mongoose.set("strictQuery", false);

const connectToDB = async () => {
  try {
    const { connection } = await mongoose.connect(
      (`${process.env.MONGO_URI}${DB_NAME}`) 
    );

    if (connection) {
      console.log(`Connected to MongoDB: ${connection.host}`);
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectToDB;
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URL as string;
        mongoose.set("strictQuery", true);
        await mongoose.connect(uri);
        console.log('MongoDB Connected');
    } catch (error: any) {
        console.error('MongoDB connection error: ', error);
        process.exit(1);
    }
}

export default connectDB;
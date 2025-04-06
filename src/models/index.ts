import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from "dotenv";
// import UserModel from '../services/users/users.model';
// import VerificationModel from '../services/verifications/verifications.model';
// import AuthModel from '../services/auth/auth.model';
// import DeviceModel from '../services/devices/devices.model';
dotenv.config()
const connectToDatabase = async () => {
    const connectionString = (process.env.DB_URI) as string;

    mongoose.set('strictQuery', true);
    await mongoose.connect(connectionString, {
        autoIndex: false,
        dbName: process.env.DB_NAME,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        sanitizeFilter: true,
        autoCreate: false,
        minPoolSize: 5, // Maintain up to 5 socket connections
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    } as ConnectOptions);
    // await UserModel.createCollection();
    // await VerificationModel.createCollection();
    // await AuthModel.createCollection();
    // await DeviceModel.createCollection();
};
export { connectToDatabase };

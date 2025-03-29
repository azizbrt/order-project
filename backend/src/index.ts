import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/auth.route";
import myHotelRoutes from "./routes/my-hotels.route";
import cookiePaser from "cookie-parser";
import {v2 as cloudinary} from "cloudinary";
import path from "path";

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
    .then(() => console.log("MongoDB connected to DB",process.env.MONGODB_CONNECTION_STRING))
    .catch((err) => console.error("MongoDB connection error:", err));

const app = express();
app.use(cookiePaser());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}
));

// Serve static files from the frontend
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/my-hotels",myHotelRoutes);
app.get("*",(req:express.Request, res: express.Response) => {
    res.sendFile(path.join( __dirname + "../../frontend/dist/index.html"));
})

app.listen(7000, () => {
    console.log("Server running on port 7000");
});

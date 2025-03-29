import express from "express";
import multer from "multer";
import verifyToken from "../../middlewares/verifyToken";
import { createHotel } from "../controllers/hotel.controller";
import { hotelValidation } from "../../middlewares/validators";

const router = express.Router();

// 📌 Set up multer (to handle image uploads)
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
});

// 📌 API route for creating a hotel
router.post("/", verifyToken, hotelValidation, upload.array("imageFiles", 6), createHotel);

export default router;

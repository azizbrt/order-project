import express, { Request, Response } from "express";
import multer from "multer";
import verifyToken from "../../middlewares/verifyToken";
import { createHotel, getMyHotels } from "../controllers/hotel.controller";
import { hotelValidation } from "../../middlewares/validators";
import Hotel from "../models/hotel.model";

const router = express.Router();

// 📌 Set up multer (to handle image uploads)
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
});

// 📌 API route for creating a hotel
router.post("/", verifyToken, hotelValidation, upload.array("imageFiles", 6), createHotel);
router.get("/", verifyToken, getMyHotels);
router.get("/:id", verifyToken, async (req:Request, res:Response) => {
    const id = req.params.id.toString();
    try {
        const hotel = await Hotel.findOne({
            _id: id,
            userId: req.userId,
        });
        res.json(hotel);
        
    } catch (error) {
        console.error("�� Error fetching hotel:", error);
        res.status(500).json({ message: "Error fetching hotel" });
        
    }
})


export default router;

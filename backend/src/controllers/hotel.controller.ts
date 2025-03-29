import { Request, Response } from "express";
import cloudinary from "cloudinary";
import Hotel, { HotelType } from "../models/hotel.model";

// 📌 Function to create a new hotel
export const createHotel = async (req: Request, res: Response) => {
    try {
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel: HotelType = req.body;

        // 📌 Upload images to Cloudinary
        const imageUrls = await Promise.all(
            imageFiles.map(async (image) => {
                const b64 = Buffer.from(image.buffer).toString("base64");
                const dataURI = `data:${image.mimetype};base64,${b64}`;
                const result = await cloudinary.v2.uploader.upload(dataURI, { folder: "hotels" });
                return result.url;
            })
        );

        // 📌 Assign image URLs to the hotel
        newHotel.imagesUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId; // Make sure req.userId is a valid ObjectId

        // 📌 Save hotel to database
        const hotel = new Hotel(newHotel);
        await hotel.save();

        // 📌 Return the saved hotel
        res.status(201).json(hotel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

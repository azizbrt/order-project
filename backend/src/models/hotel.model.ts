import mongoose, { Schema, Document } from "mongoose";

export interface HotelType extends Document {
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imagesUrls: string[];
  lastUpdated: Date;
}

const hotelSchema = new Schema<HotelType>(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    adultCount: { type: Number, required: true },
    childCount: { type: Number, required: true },
    facilities: { type: [String], required: true },
    pricePerNight: { type: Number, required: true },
    starRating: { type: Number, required: true, min: 1, max: 5 },
    imagesUrls: { type: [String], required: true },
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true } // ⏳ Auto-adds createdAt & updatedAt
);

const Hotel = mongoose.model<HotelType>("Hotel", hotelSchema);
export default Hotel;

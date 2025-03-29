import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// 🎯 UserType: This describes what a user must have
export type UserType = {
    _id: string; // Unique ID for the user
    email: string; // User's email (must be unique)
    password: string; // User's password
    firstName: string; // User's first name
    lastName: string; // User's last name
};

// 🏗 UserSchema: This builds the "box" for storing users in MongoDB
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,  // 🟢 Supprime les espaces avant/après
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,  // 🟢 Supprime les espaces avant/après
    },
    lastName: {
        type: String,
        required: true,
        trim: true,  // 🟢 Supprime les espaces avant/après
    },
});
UserSchema.pre("save", async function (this: any, next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next(); // ✅ Important pour continuer l'exécution
});



// 🚀 Create the User model based on UserSchema
const User = mongoose.model<UserType>("User", UserSchema);

export default User;

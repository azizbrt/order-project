import { body, check } from "express-validator";

// ✅ Validation pour l'inscription
export const validateRegister = [
    check("email").isEmail().withMessage("❌ L'email doit être valide"),
    check("password").isLength({ min: 6 }).withMessage("❌ Le mot de passe doit contenir au moins 6 caractères"),
    check("firstName").notEmpty().withMessage("❌ Le prénom est obligatoire"),
    check("lastName").notEmpty().withMessage("❌ Le nom est obligatoire"),
];

// ✅ Validation pour la connexion
export const validateLogin = [
    check("email").isEmail().withMessage("❌ L'email est obligatoire et doit être valide"),
    check("password").isLength({ min: 6 }).withMessage("❌ Le mot de passe est obligatoire (6 caractères min)"),
];

// 📌 Validation rules for hotel creation
export const hotelValidation = [
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("type").notEmpty().withMessage("Type is required"),
    body("pricePerNight").notEmpty().withMessage("Price per night is required"),
    body("adultCount").isNumeric().withMessage("Adult count must be a number"),
    body("childCount").isNumeric().withMessage("Child count must be a number"),
    body("facilities.*").notEmpty().withMessage("Facilities are required"),
];


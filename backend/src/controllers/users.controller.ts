import { Request, Response } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";


export const registerUser = async (req: Request, res: Response) => {
     // 🔍 Vérifier s'il y a des erreurs de validation
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
     }
    try {
        // 🔍 1️⃣ Vérifier si l'utilisateur existe déjà dans la base de données
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(400).json({ message: "L'utilisateur existe déjà" });
        }

        // ✨ 2️⃣ Créer un nouvel utilisateur avec les données envoyées
        const newUser = new User(req.body);
        await newUser.save();

        // 🔑 3️⃣ Vérifier si la clé secrète JWT est bien définie
        const jwtSecretKey = process.env.JWT_SECRET_KEY;
        if (!jwtSecretKey) {
            throw new Error("Clé secrète JWT manquante");
        }

        // 🔐 4️⃣ Générer un token JWT pour l'utilisateur
        const token = jwt.sign({ userId: newUser.id }, jwtSecretKey, { expiresIn: "1d" });

        // 🍪 5️⃣ Envoyer le token dans un cookie sécurisé
        res.cookie("auth_token", token, {
            httpOnly: true,  // 🔒 Empêche l'accès au cookie depuis JavaScript côté client
            secure: process.env.NODE_ENV === "production", // 🚀 Active HTTPS en mode production
            maxAge: 86400000, // ⏳ Expire après 24 heures
            sameSite: "strict", // 🚫 Empêche les attaques CSRF
        });

        // 🎉 6️⃣ Répondre avec un message de succès
        res.status(201).json({
            message: "Utilisateur enregistré avec succès",
            user: {
                id: newUser.id,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
            },
        });

    } catch (error) {
        // ⚠️ 7️⃣ Gérer les erreurs et envoyer un message clair
        console.error("Erreur lors de l'inscription :", error);
        res.status(500).json({
            message: error instanceof Error ? error.message : "Une erreur inconnue s'est produite",
        });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        // 🔍 1️⃣ Vérifier s'il y a des erreurs dans les champs
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // 🔑 2️⃣ Chercher l'utilisateur dans la base de données
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Utilisateur non trouvé" });
        }

        // 🔒 3️⃣ Vérifier si le mot de passe est correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
        }

        // 🔐 4️⃣ Générer un jeton (token) pour l'utilisateur
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: "1d" }
        );

        // 🍪 5️⃣ Envoyer le token dans un cookie sécurisé
        res.cookie("auth_token", token, {
            httpOnly: true,  // Empêche l'accès au cookie par JavaScript
            secure: process.env.NODE_ENV === "production", // HTTPS en production
            maxAge: 86400000, // Expire dans 1 jour
            sameSite: "strict",
        });

        // 🎉 6️⃣ Répondre avec l'ID et le nom de l'utilisateur
        res.status(200).json({
            message: "Connexion réussie !",
            userId: user._id,
            firstName: user.firstName,  // Ajout du prénom pour affichage dans le frontend
        });

    } catch (error) {
        console.error("❌ Erreur lors de la connexion :", error);
        res.status(500).json({ message: "Une erreur inconnue s'est produite" });
    }
};
export const checkAuth = async (req: Request, res: Response)=>{
    try {
        res.status(200).send({userId: req.userId})
    } catch (error) {
        
    }

}
export const logout = async (req: Request, res: Response) =>{
    res.cookie("auth_token","",{
        expires: new Date(0),
        httpOnly: true
    })
    res.send()
}
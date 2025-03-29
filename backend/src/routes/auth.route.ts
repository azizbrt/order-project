import express, { Request, Response } from "express";
import { loginUser, logout, registerUser } from "../controllers/users.controller";
import { check } from "express-validator";
import { validateLogin, validateRegister } from "../../middlewares/validators";
import verifyToken from "../../middlewares/verifyToken";

const router = express.Router();

router.post("/register",validateRegister, registerUser); 
router.post("/login", validateLogin,loginUser);
router.get("/validate-token",verifyToken,(req:Request, res:Response) => {
    res.status(200).send({ userId: req.userId });})
router.post("/logout",logout);


export default router;

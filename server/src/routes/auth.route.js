import express from "express";
import { signup, login, googleLogin } from "../controllers/auth.controller.js"

const router = express.Router();

router.post("/sign-up",signup)
router.post("/login",login)
router.post("/google",googleLogin)

export default router;

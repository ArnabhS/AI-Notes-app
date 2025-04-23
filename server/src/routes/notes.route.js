import express from "express";
import { createNote, getNotes, deleteNote } from "../controllers/notes.controller.js"
import { authenticateUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/",authenticateUser, createNote)
router.get("/",getNotes)
router.delete("/delete/:id",authenticateUser,deleteNote)

export default router;

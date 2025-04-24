import express from "express";
import { createNote, getNotes, deleteNote, editNote } from "../controllers/notes.controller.js"
import { authenticateUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/",authenticateUser, createNote)
router.get("/",authenticateUser,getNotes)
router.put("/edit/:id",authenticateUser,editNote)
router.delete("/delete/:id",authenticateUser,deleteNote)

export default router;

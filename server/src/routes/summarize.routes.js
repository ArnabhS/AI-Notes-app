import express from "express";
import { summarize } from "../controllers/summarizer.controller.js"

const router = express.Router();

router.post("/",summarize);


export default router;

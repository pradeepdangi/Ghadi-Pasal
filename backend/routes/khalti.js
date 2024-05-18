import express from "express";
const router = express.Router();
import {
    khalti,
} from "../controllers/khalti.js";

router.post("/khalti", khalti);

export default router;
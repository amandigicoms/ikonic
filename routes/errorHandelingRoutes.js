import express from "express";
import { errorHandelingController } from "../controllers/errorHandelingController.js";

// router object
const router = express.Router();

// Routing

// DOWNLOAD URL'S || POST
router.post("/handle", errorHandelingController);

export default router;

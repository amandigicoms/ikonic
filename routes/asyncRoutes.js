import express from "express";
import { downloadUrlsController } from "../controllers/asyncController.js";

// router object
const router = express.Router();

// Routing

// DOWNLOAD URL'S || POST
router.post("/download-url", downloadUrlsController);

export default router;

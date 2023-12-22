import express from "express";
import { fileController } from "../controllers/fileController.js";

// router object
const router = express.Router();

// Routing

// READ FILE|| GET
router.get("/read-files", fileController);

export default router;

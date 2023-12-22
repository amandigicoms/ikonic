import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/userController.js";

// router object
const router = express.Router();

//routing

// REGISTER || POST
router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController);

export default router;

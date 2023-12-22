import express from "express";
import { isAdmin, requireSignIn } from "../middelwares/auhMiddelware.js";
import {
  categoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";

// router object
const router = express.Router();

// Created CRUD operations on categories
// In this I have created two middelwares, reuireSignIn and isAdmin.
// requireSignsIn asks for the valid token, if the user have token then it can let it go forward otherwise it'll
// be stuck in middelware. Same is Admin. I've created a protected route in it. Remember
// we created the users and their was a field that was a role with default value to 0.
// Please go to db and make it 1. In isAdmin middelware it will check for role and if it is 1 means admin
// then we can prceed furter otherwise simple users only with the token cannot access that controller.
// We can pass no middelware just to get direct into the controller.

// requireSignIn for valid token required
// isAdmin for only selected user from the database
// More you can see about this in /middelwares/authMiddelware.js

//routing

// CREATE CATEGORY || POST
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

// GET ALL CATEGORY || GET
router.get("/categories", categoryController);

// GET SINGLE CATEGORY || GET
router.get("/single-category/:id", singleCategoryController);

// UPDATE CATEGORY || PUT
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

// DELETE CATEGORY || DELETE
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;

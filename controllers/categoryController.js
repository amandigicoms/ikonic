import colors from "colors";
import categoryModel from "../models/categoryModel.js";

//create category
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    //validate
    if (!name) {
      return res.status(401).json({
        message: "Name is required",
      });
    }

    //existing
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category exists",
      });
    }

    //new category
    const category = await new categoryModel({
      name,
    }).save();

    return res.status(201).json({
      success: true,
      message: "New category created",
      category,
    });
  } catch (err) {
    console.error(colors.bgRed.white(`${err}`));
    res.status(500).json({
      success: false,
      message: "Error in Create Category",
      err,
    });
  }
};

// update category
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      {
        name,
      },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Category Updated Successfully",
      category,
    });
  } catch (err) {
    console.error(colors.bgRed.white(`${err}`));
    res.status(500).json({
      success: false,
      message: "Error in Update Category",
      err,
    });
  }
};

// get all category
export const categoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find();

    return res.status(201).json({
      success: true,
      message: "All Categories",
      count: categories.length,
      categories,
    });
  } catch (err) {
    console.error(colors.bgRed.white(`${err}`));
    res.status(500).json({
      success: false,
      message: "Error in getting all Categories",
      err,
    });
  }
};

// get single  all category
export const singleCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findOne({ _id: id });

    // validation
    if (!category) {
      return res.status(401).json({
        success: true,
        message: "Category not found",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Get single category successfully.",
      category,
    });
  } catch (err) {
    console.error(colors.bgRed.white(`${err}`));
    res.status(500).json({
      success: false,
      message: "Error in getting single category",
      err,
    });
  }
};

//dselete category
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await categoryModel.findById(id);

    // validation
    if (!category) {
      return res.status(401).json({
        success: false,
        message: "Category not exist",
      });
    }
    if (category) {
      await categoryModel.findByIdAndDelete(id);
      return res.status(201).json({
        success: true,
        message: "Category Deleted.",
      });
    }
  } catch (err) {
    console.error(colors.bgRed.white(`${err}`));
    res.status(500).json({
      success: false,
      message: "Error in deleting single category",
      err,
    });
  }
};

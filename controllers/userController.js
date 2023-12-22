import userModel from "../models/userModel.js";
import colors from "colors";
import JWT from "jsonwebtoken";

// register
export const registerController = async (req, res) => {
  try {
    const { name, email } = req.body;

    //validation
    const missingFields = {};
    if (!name) missingFields.name = "Name is required";
    if (!email) missingFields.email = "Email is required";

    if (Object.keys(missingFields).length > 0) {
      return res.status(400).json({ error: missingFields });
    }

    //existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(401).send({
        success: true,
        message: "Already Registered",
      });
    }
    //save
    const user = await new userModel({
      name,
      email,
    }).save();

    return res.status(200).send({
      success: true,
      message: "Registered Successfully",
      user: {
        name: user?.name,
        email: user?.email,
      },
    });
  } catch (err) {
    console.log(colors.bgRed.white(`${err}`));
    res.status(500).send({
      success: false,
      message: "Error in register user.",
      err,
    });
  }
};

//login controller
export const loginController = async (req, res) => {
  try {
    const { email } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    // Check if the user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email is not registered",
      });
    }

    // Generate and sign a JWT token
    const token = JWT.sign({ _id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Send a successful response
    return res.status(200).json({
      success: true,
      message: "Login Successfully",
      user: {
        name: user.name,
        email: user.email,
        token,
      },
    });
  } catch (err) {
    console.error(colors.bgRed.white(`${err}`));
    res.status(500).json({
      success: false,
      message: "Error in login",
      error: err.message,
    });
  }
};

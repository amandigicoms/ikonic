import colors from "colors";
import { listFilesWithExtension } from "../utils/fileReading.js";

export const fileController = async (req, res) => {
  try {
    const { directoryPath, fileExtension } = req.body;

    // validation
    if (!directoryPath) {
      return res.status(400).send({
        success: false,
        message: "Directory Path is required.",
      });
    }

    if (!fileExtension) {
      return res.status(400).send({
        success: false,
        message: "File Extension is required.",
      });
    }
    // searching for file in directory
    const filesWithExtension = listFilesWithExtension(
      directoryPath,
      fileExtension
    );

    // returning file in response
    return res.status(200).json({
      success: true,
      message: `Files with extension .${fileExtension}:`,
      files: filesWithExtension,
    });
  } catch (err) {
    console.log(colors.bgRed.white(`${err}`));
    return res.status(500).send({
      success: false,
      message: "Error in Finding Files.",
      err,
    });
  }
};

import colors from "colors";
import axios from "axios";

// Error Handeling through Api
export const errorHandelingController = async (req, res) => {
  try {
    const { apiEndpoint } = req.body;

    // validation
    if (!apiEndpoint) {
      return res.status(400).json({
        success: false,
        message: "Api Endpoint is required.",
      });
    }

    const response = await axios.get(apiEndpoint);

    //if the response status is within 200 to 300
    if (response.status >= 200 && response.status < 300) {
      return res.status(200).send({
        success: true,
        message: "Fetched Data Successfully.",
        response,
      });
    } else {
      // if the response fails, it'll tell the status
      return res.status(500).send({
        success: false,
        message: `Request failed with status ${response.status}`,
      });
    }
  } catch (error) {
    console.log(colors.bgRed.white(`Error -> ${error.message}`));
    return res.status(500).send({
      success: false,
      message: "Error in handeling errors controller.",
      error,
    });
  }
};

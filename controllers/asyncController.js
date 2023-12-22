import colors from "colors";
import axios from "axios";

// Download Content from URL's
export const downloadUrlsController = async (req, res) => {
  try {
    const { urls } = req.body;
    if (!urls) {
      return res.status(400).json({
        success: false,
        message: "Url's should be more than 1",
      });
    }

    // in this, each url will be passed from axios get method one by one
    const downloadPromises = urls.map(async (url) => {
      try {
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        console.error(`Error downloading from ${url}: ${error.message}`);
        return null;
      }
    });

    // promises all returns a single promise with one array when all promises inside of it are completed
    const downloadedContents = await Promise.all(downloadPromises);

    // passing the content in response
    return res.status(200).json({
      success: true,
      message: "Content downloaded successfully",
      downloadedContents,
    });
  } catch (err) {
    console.log(colors.bgRed.white(`${err}`));
    return res.status(500).send({
      success: false,
      message: "Error in Downloading content.",
      err,
    });
  }
};

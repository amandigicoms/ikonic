import fs from "fs";

const listFilesWithExtension = (directoryPath, fileExtension) => {
  try {
    const files = fs.readdirSync(directoryPath);
    return files.filter((file) => file.endsWith(`.${fileExtension}`));
  } catch (error) {
    console.error(`Error listing files: ${error.message}`);
    return [];
  }
};

export { listFilesWithExtension };

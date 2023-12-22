import mongoose from "mongoose";

const categoryScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model("Category", categoryScheme);

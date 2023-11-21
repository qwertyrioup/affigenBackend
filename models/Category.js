import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    sub_category: {
      type: String,
      required: true,
    },

  },
  { timestamps: true }
);

export default mongoose.model("Category", CategorySchema);

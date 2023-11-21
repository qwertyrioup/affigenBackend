import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    dsc: {
      type: String,
 
    },
    
    price: {
      type: Number,
  
    },
    

  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);

import mongoose from "mongoose";

const RevenueSchema = new mongoose.Schema(
  {
    
    orderId: {
      type: String,
      required: true
    },
    
    value: {
      type: Number,
      required: true
    },
   
  },
  { timestamps: true }
);

export default mongoose.model("Revenue", RevenueSchema);

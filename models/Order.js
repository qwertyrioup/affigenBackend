import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user_details: {
      type: Object,
      required: true,
    },
    cart: {
      type: Object,
      required: true,
    },
   
      userId: {
        type: String,
        required: true,
      },
   
    status: {
      type: String,
      default: 'Processing'
    },
    type: {
      type: String,
      required: true,
    },
    
    seen: {
      type: Boolean,
      default: false,
    },
   
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);

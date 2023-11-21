import mongoose from "mongoose";

const OdooSchema = new mongoose.Schema(
  {
    product_name: { type: String },
    is_published: { type: Boolean },
    cat_affigen: { type: String },
    website_name: { type: String },
    buy_price: { type: String },
    sell_price: { type: String },
    meta_description: { type: String },
    keywords: { type: String },
    meta_title: { type: String },
    size: { type: String },
    product_type: { type: String },
    product_category: { type: String },
    slug: { type: String },
    is_indexed: { type: Boolean },
    website_sequence: { type: String },
  },
  
);

export default mongoose.model("Odoo", OdooSchema);

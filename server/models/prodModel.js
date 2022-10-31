const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String },
    description: { type: String, required: true },
    size: { type: String },
    image: { type: Object, required: true },
    price: { type: Number },
  },
  { timestamps: true }
);

const Products = mongoose.model("product", productSchema);
module.exports = { Products };

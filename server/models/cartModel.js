const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartObject = {
  products: [
    {
      type: mongoose.Types.ObjectId,
      ref: "products",
    },
  ],
};

const cartSchema = new Schema(cartObject);
const Carts = mongoose.model("cart", cartSchema);
module.exports = { Carts };

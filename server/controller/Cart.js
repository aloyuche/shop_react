const { Carts } = require("../models/cartModel");
const { Products } = require("../models/prodModel");

module.exports = {
  create: async (req, res) => {
    try {
      const newCart = new Carts({ ...req.body });
      await newCart.save();
      return res.json({
        status: newCart ? 201 : 404,
        message: newCart ? "success" : "error occured",
        data: newCart,
      });
    } catch (error) {
      console.log(error.message);
      return res.json({
        status: 500,
        message: "unable to create cart",
        data: error.message,
      });
    }
  },

  addProduct: async (req, res) => {
    const newCart = new Carts([]);
    const product = await Products.findOne({ _id: req.params.id });
    newCart.products.push(product._id);
    await newCart.save();
    res.json({ newCart });
  },
  findAll: async (req, res) => {
    try {
      const allCart = await Carts.find().populate({
        path: "products",
        model: Products,
      });
      return res.json({
        status: allCart.length > 0 ? 200 : 400,
        message: allCart.length > 0 ? "success" : "error",
        data: allCart,
      });
    } catch (error) {
      console.log(error.message);
      return res.json({
        status: 500,
        message: "unable to create product",
        data: error.message,
      });
    }
  },
  findOne: async (req, res) => {
    try {
      const cart = await Carts.findOne({ _id: req.params.id });
      return res.json({
        status: cart ? 200 : 404,
        message: cart ? "Success" : "not Found",
        data: cart,
      });
    } catch (error) {
      console.log(error.message);
      return res.json({
        status: 500,
        message: "unable to create product",
        data: error.message,
      });
    }
  },
  update: async (req, res) => {
    try {
      const existingCart = await Carts.findOne({
        _id: req.params.cartId,
      });
      if (!existingCart) {
        return res.json({
          status: 404,
          message: "Cart does not exist",
        });
      }
      existingCart.cart.push(req.body.cartId);
      await existingCart.save();
    } catch (error) {
      console.log(error.message);
      return res.json({
        status: 500,
        message: "unable to update product",
        data: error.message,
      });
    }
  },
  delete: async (req, res) => {
    try {
      await Carts.deleteOne({ _id: req.params.id });
      return res.json({
        status: 200,
        message: "deleted successfully:" + req.params.id,
      });
    } catch (error) {
      console.log(error.message);
      return res.json({
        status: 500,
        message: "unable to delete product",
        data: error.message,
      });
    }
  },

  // delete product from cart
  // /:cardId/:productId
  deleteProduct: async (req, res) => {
    try {
      const cartId = reqw.params.cartId;
      const productId = req.params.productId;

      // add validation to check if the id are not provided
      if (!cartId || !productId) {
        return res.json({
          status: 400,
          message: "Please provide a valid cart/product id",
        });
      }
      const cart = await Carts.findOne({ _id: cartId });
      cart.products = cart.products.filter(function (product_id) {
        return product_id.toString() !== productId;
      });
      console.log(cart.products);
      await cart.save();
      return res.json({
        status: 200,
        message: "success",
        data: cart,
      });
    } catch (error) {}
  },
};

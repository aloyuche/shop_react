const { Carts } = require("../models/cartModel");
const {Products} = require("../models/prodModel");

module.exports = {
  create: async (req, res) => {
    try {
      const newProduct = new Products({ ...req.body });
      await newProduct.save();
      return res.json({
        status: newProduct ? 201 : 404,
        message: newProduct ? "success" : "error occured",
        data: newProduct,
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

  findAll: async (req, res) => {
    try {
      const allProduct = await Products.find();
      return res.json({
        status: allProduct.length > 0 ? 200 : 400,
        message: allProduct.length > 0 ? "success" : "error",
        data: allProduct,
      });
    } catch (error) {
      console.log(error.message);
      return res.json({
        status: 500,
        message: "unable to find product",
        data: error.message,
      });
    }
  },
  findOne: async (req, res) => {
    try {
      const product = await Products.findOne({ _id: req.params.id });
      return res.json({
        status: product ? 200 : 404,
        message: product ? "Success" : "not Found",
        data: product,
      });
    } catch (error) {
      console.log(error.message);
      return res.json({
        status: 500,
        message: "unable to find product",
        data: error.message,
      });
    }
  },
  update: async (req, res) => {
    try {
      const existingProduct = await Products.findOne({
        _id: req.params.cartId,
      });
      if (!existingProduct) {
        return res.json({
          status: 404,
          message: "Cart does not exist",
        });
      }
      existingProduct.product.push(req.body.productId);
      await existingProduct.save();
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
      await Products.deleteOne({ _id: req.params.id });
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

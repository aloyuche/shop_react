const cart = require("../models/carts");
const Products = require("../models/prodModel");

exports.getAllProduct = (req, res) => {
  const product = Products.findAll();
  res.render("index", {
    name: "Joshua",
    prods: product,
    path: "/",
    title: "Home",
  });
};

exports.getProductDetails = (req, res) => {
  const prodDetails = Products.findById(req.params.prodId);
  res.render("product-details", {
    prods: prodDetails[0],
    title: "Product Details",
    path: "/",
    name: "Edward",
  });
};

exports.addToCart = (req, res) => {
  const addedProduct = Products.findById(req.body.id)[0];
  cart.save(addedProduct);
  console.log(cart.getCart());
  res.end("Save successfully");
};

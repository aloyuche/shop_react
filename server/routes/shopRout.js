const router = require("express").Router();
const path = require("path");

const shopController = require("../controller/shopControl");

router.get("/", shopController.getAllProduct);

router.get("/products/:prodId", shopController.getProductDetails);

router.get("/error-demo", (req, res, next) => {
  throw new Error("This is to test error handling");
});

router.post("/add-to-cart", shopController.addToCart);

module.exports = router;

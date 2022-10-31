// Creating new product with authentication
const { Products } = require("../../models/prodModel");
const { verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

// CREATE PRODUCTS
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const addproduct = new Products(req.body);
  try {
    const newProduct = await addproduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE product
router.put("/:id", verifyTokenAndAdmin, async (req, res, next) => {
  try {
    const updatedProduct = await Products.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete Product by Admin

router.delete("/:id", verifyTokenAndAdmin, async (req, res, next) => {
  try {
    await Products.findByIdAndDelete(req.params.id);
    res.status(201).json("User deleted successfully");
  } catch (err) {
    res.json(err);
  }
});

// Find Single Product
router.get("/find/:id", async (req, res, next) => {
  try {
    const products = await Products.findById(req.params.id);
    res.status(200).json(products);
  } catch (err) {
    res.json(err);
  }
});

// Find All Products
router.get("/", async (req, res, next) => {
  const qCategories = req.query.new;
  try {
    let product;

    if (qNew) {
      product = await Products.find().sort({ _id: -1 }).limit(1);
    } else if (qCategory) {
      product = await Products.find({
        categories: {
          $in: [qCategories],
        },
      });
    } else {
      product = await Products.find();
    }
    res.status(201).json(product);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;

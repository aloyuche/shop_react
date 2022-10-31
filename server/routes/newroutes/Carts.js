// Creating new product with authentication
const Carts = require("../../models/newCartMo");
const {
  verifyTokenAndAdmin,
  verifyToken,
  verifyTokenAndAuth,
} = require("./verifyToken");

const router = require("express").Router();

// CREATE CARTS
router.post("/", verifyToken, async (req, res) => {
  const addCart = new Carts(req.body);
  try {
    const newCart = await addCart.save();
    res.status(201).json(newCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE Cart
router.put("/:id", verifyTokenAndAuth, async (req, res, next) => {
  try {
    const updatedCart = await Carts.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete Product by Admin

router.delete("/:id", verifyTokenAndAuth, async (req, res, next) => {
  try {
    await Carts.findByIdAndDelete(req.params.id);
    res.status(201).json("User deleted successfully");
  } catch (err) {
    res.json(err);
  }
});

// Find Single Cart
router.get("/find/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    const carts = await Carts.findById({ userId: req.params.id });
    res.status(200).json(carts);
  } catch (err) {
    res.json(err);
  }
});

// Find All Carts
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const cart = await Carts.find();

    res.status(201).json(cart);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;

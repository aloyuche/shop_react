// Creating new product with authentication
const Order = require("../../models/orderModel");
const {
  verifyTokenAndAdmin,
  verifyToken,
  verifyTokenAndAuth,
} = require("./verifyToken");

const router = require("express").Router();

// CREATE Order
router.post("/", verifyToken, async (req, res) => {
  const Orders = new Order(req.body);
  try {
    const newOrder = await Orders.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE Order
router.put("/:id", verifyTokenAndAuth, async (req, res, next) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete Product by Admin

router.delete("/:id", verifyTokenAndAuth, async (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(201).json("User deleted successfully");
  } catch (err) {
    res.json(err);
  }
});

// Find Single Order
router.get("/find/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    const orders = await Order.findById({ userId: req.params.id });
    res.status(200).json(orders);
  } catch (err) {
    res.json(err);
  }
});

// Find All Order
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const order = await Order.find();

    res.status(201).json(order);
  } catch (err) {
    res.json(err);
  }
});

// GET MONTHLY INCOME
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(201).json(income);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

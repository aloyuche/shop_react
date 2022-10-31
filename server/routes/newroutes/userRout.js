const userModel = require("../../models/userModel");
const { verifyTokenAndAdmin, verifyTokenAndAuth } = require("./verifyToken");

const router = require("express").Router();

// UPDATE
router.put("/:id", verifyTokenAndAuth, async (req, res, next) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString();
  }
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete User by Admin

router.delete("/:id", verifyTokenAndAuth, async (req, res, next) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.status(201).json("User deleted successfully");
  } catch (err) {
    res.json(err);
  }
});

// Find Single User By Admin
router.get("/find/:id", verifyTokenAndAdmin, async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.json(err);
  }
});

// Find All Users By Admin
router.get("/", verifyTokenAndAdmin, async (req, res, next) => {
  const query = req.query.new;
  try {
    const users = query
      ? await userModel.find().sort({ _id: -1 }).limit(5)
      : await userModel.find();
    res.status(200).json(users);
  } catch (err) {
    res.json(err);
  }
});

// USER STATS

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await userModel.aggregate([
      {
        $match: { createdAt: { $gte: lastYear } },
      },
      {
        $project: { month: { $month: "$createdAt" } },
      },
      {
        $group: { _id: "$month", total: { $sum: 1 } },
      },
    ]);
    res.json(data);
  } catch (error) {}
});

module.exports = router;

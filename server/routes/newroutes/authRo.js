const router = require("express").Router();
const User = require("../../models/userModel");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// router.use(CryptoJS());

// REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      // using cryptoJs bcrypt
      req.body.password,
      process.env.PASS_SECRET
    ).toString(),
  });
  try {
    const newRegister = await newUser.save();
    res.status(201).json(newRegister);
  } catch (error) {
    res.status(500).json(error);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("Wrong credentials");
    const hashedPass = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SECRET
    );
    const passwrd = hashedPass.toString(CryptoJS.enc.Utf8);
    passwrd !== req.body.password && res.status(401).json("Wrong password");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );
    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

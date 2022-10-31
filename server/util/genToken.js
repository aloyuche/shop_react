const jwt = require("jsonwebtoken");

const genToken = (user) => {
  const secretKey = process.env.PASS_SECRET;
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    secretKey
  );
  return token;
};

module.exports = genToken;

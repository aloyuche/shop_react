const router = require("express").Router();

const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "USD",
    },
    (stripeErro, stripRes) => {
      if (stripeErro) {
        res.status(500).json(stripeErro);
      } else {
        res.status(200).json(stripRes);
      }
    }
  );
});

module.exports = router;

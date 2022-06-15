const router = require("express").Router();
const stripe = require("stripe").Stripe(process.env.STRIPE_KEY);

router.post(
  "/payment",
  (req, res) => {
    stripe.charge.create({
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "USD",
    });
  },
  (stripeErr, stripeRes) => {
    if (stripeErr) {
      return res.status(500).json({ stripeErr });
    } else {
      return res.status(200).json({ stripeRes });
    }
  }
);

module.exports = router;

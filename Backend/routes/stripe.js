const express = require("express");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51FrsMEJyECnw5rCL4g5bJkAmDbIWUonjxMQG1h6NDhCaDQ9e29456MxLFFmWRZCf30PZILvtaP0J4FXvHdieWO8e0092YqW109"
);

router.get("/", (req, res) => {
  res.send("this is create-payment-intent page");
});

router.post("/", async (req, res) => {
  const { amount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 35000,
    currency: "usd",
    automatic_payment_methods: {enabled: true},
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
    body: paymentIntent 
  });
});
module.exports = router;

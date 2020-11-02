const express = require("express");
const Payment = require("../model/Payments");
const auth = require("../middleware/auth");
const router = new express.Router();
const stripe = require("stripe")("sk_test_51HeKR4CDJDwfFsCVhJk6WaFHvs4szJMDkCX0wLaQrPkgOfUnayfeVUqhjbQs83y6vhHr5Yc73Wvz0zQt1MXEZdcp00WJ48jfYf");

router.post("/payment", auth, async (req, res) => {
  try {
    await stripe.charges.create({
      amount: req.body.amount,
      currency: req.body.currency,
      source: req.body.token
    }).then((charges) => {
      const payment = Payment({
        ...req.body,
        owner: req.user.id
      });
      payment.save();
      res.status(201).send(payment);
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/checkPayment/:program_name", auth, async (req, res) => {
  try {
    const payment = await Payment.find({
      program_name: req.params.program_name,
      owner: req.user.id
    });
    if (!payment || payment.length === 0) {
      return res.status(404).send();
    }
    res.status(200).send(payment);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/checkSubscription", auth, async (req, res) => {
  try {
    const payment = await Payment.find({
      owner: req.user.id
    });
    if (!payment) {
      return res.status(404).send();
    }
    res.status(200).send(payment);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;

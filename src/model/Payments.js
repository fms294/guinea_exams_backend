const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Users"
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  program_name: {
    type: String,
    required: true
  },
  token: {
    type: String,
    trim: true
  }
}, { timeStamp: true }
);

const Payment = mongoose.model("payment", paymentSchema);

module.exports = Payment;

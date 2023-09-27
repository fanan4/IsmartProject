const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
  _id: {
    type: Number,
    required: [true, "Id is required"],
  },
  userId: {
    type: String,
    ref: "User",
    required: [true, "userId is required"],
  },
  chargerId: {
    type: String,
    ref: "ChargePoint",
    required: [true, "chargerId is required"],
  },
  status: {
    type: String,
    required: [true, "status is required"],
  },
  duration: {
    type: Number,
    required: [true, "duration is required"],
  },
  klwCharged: {
    type: Number,
    required: [true, "klwCharged is required"],
  },
  meterStart: {
    type: Number,
    required: [true, "meterStart is required"],
  },
  timestamp: {
    type: Date,
    default: Date(),
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;

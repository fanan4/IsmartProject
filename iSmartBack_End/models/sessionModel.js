const mongoose = require("mongoose");
const shortid = require("shortid");

const sessionSchema = mongoose.Schema({
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
    enum:[''],
    required: [true, "status is required"],
  },
  duration: {
    type: Number,
    required: [true, "duration is required"],
  },
  location: {
    type: String,
    required: [true, "location is required"],
  },
  totalKlwCharged: {
    type: Number,
    required: [true, "klwCharged is required"],
  },
  revenue: {
    type: Number,
    required: [true, "revenue is required"],
  },
  transactions: {
    type: [Number],
    ref: "Transaction",
  },
  timestamp: {
    type: Date,
    default: new Date(),
  },
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
const mongoose = require("mongoose");

const reservationSchema = mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  reservationId: {
    type: Object,
  },
  userId: {
    type: Object,
  },
  chargerId: {
    type: Object,
  },
  time: {
    type: Date,
  },
  status: {
    type: String,
  },
  connectorId: {
    type: Number,
  },
  sessionDuration: {
    type: Number,
  },
  location: {
    type: String,
  },
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;

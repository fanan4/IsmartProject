const mongoose = require("mongoose");
const shortid=require('shortid')


const connectorSchema = new mongoose.Schema({
  
  connectorType:{
    type:String,
  } ,
  powerRating: Number,
  connectorStatus:{
     type:String,
  } ,
  connectorId: {
    type: String, 
    type: String,
  },
  
});

const chargePointsSchema = mongoose.Schema({
  _id: {
    type: String,
    default:shortid.generate(), 
  },
  chargerName: {
    type: String,
    unique: true,
    required: [true, "charge name is required"], 
  },
  location: {
    type: String,
    required: [true, "charge location is required"],
  },
  connectors: [ connectorSchema ], 
  session: {
    type: Number,
    ref: "Session",
  },
  status: {
    type: String,
    default: "offline",
  },
  longitude: { 
    type: Number,
 
  },
  latitude: {
    type: Number,
 
  },
  chargerModel: {
    type: String,
  },
  chargerVendor: {
    type: String,
  },
  supportNumber: {
    type: String,
  },
  address: {
    type: String,
  },
});

const ChargePoint = mongoose.model("ChargePoint", chargePointsSchema);

module.exports = ChargePoint;

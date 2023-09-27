const mongoose = require("mongoose");
const shortid = require('shortid'); 

const userSchema = mongoose.Schema({
  _id:{
    type:String,

  },
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  RFID: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  role: {
    type: String,
    enum:['Superadmin','admin','groupAdmin','member','client'],     
    required: [true, "password is required"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
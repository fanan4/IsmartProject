const mongoose = require('mongoose');

// Define the schema for address information
const addressSchema = new mongoose.Schema({
  address: { 
    type: String, 
    required: true 
  },
  zip: { 
    type: String,
    required: true 
  },
  city: { 
    type: String,
    required: true
    },
  country: { 
    type: String,
    required: true
 }
});

// Define the schema for members
const memberSchema = new mongoose.Schema({
  userId: { 
     type: String, 
     ref: 'User', // Reference to the User model  
    },
    
});

// Define the group schema
const groupSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
      unique:true
     },
  contactEmail: { 
     type: String,
     required: true,
     unique: true 
    },
  financialEmail: { 
     type: String,
     required: true 
    },
  companyName: { 
     type: String 
    },
  phoneNumber:{
    type:String
  },
  addressInformation: {
      type: addressSchema,
      required: true 
    },
  chargePoints: [ 
    {
      type:String,
      ref: 'ChargePoint'
     } 
    ],
   admins:[
    {
      type: String,  
      ref:'User'
    }
   ],
  members: [
    {
     type: String,  
     ref: 'User',  
  }
] 
});

// Create and export the Group model
module.exports = mongoose.model('Group', groupSchema); 
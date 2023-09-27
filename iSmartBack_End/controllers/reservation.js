const catchAsync = require("../utils/catchAsync");
const Reservation=require('../models/reservationModel');
const { HttpStatusCode } = require("axios");
 exports.getAllReservations=catchAsync(async( req,res,next )=>{
     const reservations=await Reservation.find({}) 

     return res.status(HttpStatusCode.Ok).json(reservations)  
})
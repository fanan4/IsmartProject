const express=require('express')
const router=express.Router()

const { getAllReservations } = require('../controllers/reservation')

router.route('')
      .get( getAllReservations )  


module.exports=router

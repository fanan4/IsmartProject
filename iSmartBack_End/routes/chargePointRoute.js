const express = require("express");

const chargePointController = require("../controllers/chargePoint");
const { protectRoute, SuperadminMidllware, AdminMidllware } = require("../controllers/auth");
// const authcontroller = require("../controllers/auth");
// const {
//   registerValidator,
//   updateUserValidator,
// } = require("../utils/validators");

const router = express.Router();

router
  .route("/")
  .get( protectRoute , SuperadminMidllware , chargePointController.getAllChargePoints )    
  .post( protectRoute , SuperadminMidllware, chargePointController.createChargePoint ) 
  .delete( protectRoute ,SuperadminMidllware ,chargePointController.deteAllChargePoints);  
router.route("/chartStats/:id").get( protectRoute , SuperadminMidllware , chargePointController.getChargePointStats) 
router.route("/cordinates").get( protectRoute , SuperadminMidllware ,  chargePointController.getCordinates);
router.route("/statusStats").get( protectRoute , AdminMidllware , chargePointController.getStatusStats); 
router.route("/addMany").post( protectRoute, SuperadminMidllware ,chargePointController.addManyChargePoints) 

router
  .route("/:id")
  .get( protectRoute ,AdminMidllware, chargePointController.getChargePoint) 
  .patch( protectRoute ,SuperadminMidllware ,chargePointController.updateChargePoint)
  .delete( protectRoute ,SuperadminMidllware, chargePointController.deleteChargePoint); 

module.exports = router;

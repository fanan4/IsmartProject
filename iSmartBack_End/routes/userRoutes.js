const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");
const authcontroller = require("../controllers/auth");
const {
  registerValidator,
  updateUserValidator,
} = require("../utils/validators"); 



router
  .route("/me")
  .get(authcontroller.protectRoute, userController.getMe)
  .patch(authcontroller.protectRoute, userController.updateMe);

router
  .route("/")
  .get(authcontroller.protectRoute,authcontroller.SuperadminMidllware,userController.getAllUsers)
  .post(authcontroller.protectRoute,authcontroller.SuperadminMidllware,registerValidator, userController.createUser)
  .delete(authcontroller.protectRoute,authcontroller.SuperadminMidllware,userController.deleteAllUsers);
router
   .route('/addMany')
   .post(authcontroller.protectRoute,authcontroller.AdminMidllware,userController.addManyUsers) 
   
router
  .route("/:id") 
  .get( authcontroller.protectRoute,authcontroller.AdminMidllware,userController.getUser )
  .patch( authcontroller.protectRoute,authcontroller.SuperadminMidllware,updateUserValidator, userController.updateUser )
  .delete( authcontroller.protectRoute,authcontroller.AdminMidllware,userController.deleteUser );

module.exports = router;

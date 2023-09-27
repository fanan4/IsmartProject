const express = require("express");

const transactionControllers = require("../controllers/transaction");
const { protectRoute, SuperadminMidllware } = require("../controllers/auth");
// const authcontroller = require("../controllers/auth");
// const {
//   registerValidator,
//   updateUserValidator,
// } = require("../utils/validators");

const router = express.Router();

router
  .route("/")
  .get( protectRoute,transactionControllers.getAllTransactions )
  .post(protectRoute,SuperadminMidllware,transactionControllers.createTransaction)
  .delete(protectRoute,SuperadminMidllware,transactionControllers.deleteAllTransactions);

router
  .route("/:id")
  .get(protectRoute,SuperadminMidllware,transactionControllers.getTransaction)
  .patch(SuperadminMidllware,transactionControllers.updateTransaction)
  .delete(SuperadminMidllware,transactionControllers.deleteTransaction);

module.exports = router;

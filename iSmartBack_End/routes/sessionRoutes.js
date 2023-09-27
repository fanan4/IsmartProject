const express = require("express");

const sessionControllers = require("../controllers/session");
const { protectRoute, SuperadminMidllware } = require("../controllers/auth");
// const authcontroller = require("../controllers/auth");
// const {
//   registerValidator,
//   updateUserValidator,
// } = require("../utils/validators");

const router = express.Router();

router
  .route("/")
  .get(protectRoute,SuperadminMidllware,sessionControllers.getAllSessions)
  .post(protectRoute,SuperadminMidllware,sessionControllers.createSession)
  .delete(protectRoute,SuperadminMidllware,sessionControllers.deleteAllSessions);

router.route("/sessionsCount").get(sessionControllers.getSessionsCount);
router
  .route("/totalEnergyAndDuration")
  .get(protectRoute,SuperadminMidllware,sessionControllers.getTotalEnergyAndDuration);

router
  .route("/:id")
  .get(protectRoute,SuperadminMidllware,sessionControllers.getSession)
  .patch(protectRoute,SuperadminMidllware,sessionControllers.updateSession)
  .delete(protectRoute,SuperadminMidllware,sessionControllers.deleteSession);


module.exports = router;

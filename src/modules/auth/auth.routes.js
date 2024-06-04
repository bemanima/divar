const { Router } = require("express");
const authController = require("./auth.controller");
const AuthGuard = require("../../common/guard/auth.guard");

const router = Router();

router.post("/send-otp", authController.sendOTP);
router.post("/check-otp", authController.checkOTP);
router.get("/logout", AuthGuard, authController.logout);

module.exports = {
  AuthRouter: router,
};

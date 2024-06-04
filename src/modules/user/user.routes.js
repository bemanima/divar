const { Router } = require("express");
const userController = require("./user.controller");
const AuthGuard = require("../../common/guard/auth.guard");

const router = Router();

router.get("/whoami", AuthGuard, userController.whoami);

module.exports = {
  UserRouter: router,
};

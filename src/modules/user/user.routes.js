const { Router } = require("express");
const userController = require("./user.controller");
const AuthorizationGuard = require("../../common/guard/auth.guard");

const router = Router();

router.get("/whoami", AuthorizationGuard, userController.whoami);

module.exports = {
  UserRouter: router,
};

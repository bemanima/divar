const { Router } = require("express");

const { AuthRouter } = require("./modules/auth/auth.routes");
const { UserRouter } = require("./modules/user/user.routes");
const { CategoryRouter } = require("./modules/category/category.routes");
const { OptionRouter } = require("./modules/option/option.routes");
const AuthGuard = require("./common/guard/auth.guard");

const mainRouter = Router();

mainRouter.use("/auth", AuthRouter);
mainRouter.use("/user", UserRouter);
mainRouter.use("/category", AuthGuard, CategoryRouter);
mainRouter.use("/option", AuthGuard, OptionRouter);

module.exports = mainRouter;

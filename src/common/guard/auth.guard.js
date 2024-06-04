const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const AuthorizationMessage = require("../messages/auth.message");
const UserModel = require("../../modules/user/user.model");

const AuthorizationGuard = async (req, res, next) => {
  try {
    const token = req?.cookie?.access_token;
    if (!token)
      throw new createHttpError.Unauthorized(AuthorizationMessage.Login);

    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (typeof data === "object" && "id" in data) {
      const user = await UserModel.findById(data.id, { otp: 0 }).lean();
      if (!user)
        throw new createHttpError.Unauthorized(
          AuthorizationMessage.NotFoundAccount
        );

      req.user = user;

      return next();
    }

    throw new createHttpError.Unauthorized(AuthorizationMessage.InvalidToken);
  } catch (error) {
    next(error);
  }
};

module.exports = AuthorizationGuard;

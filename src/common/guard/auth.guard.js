const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const AuthMessage = require("../messages/auth.message");
const UserModel = require("../../modules/user/user.model");

const AuthGuard = async (req, res, next) => {
  try {
    const token = req?.cookies?.access_token;

    if (!token) throw new createHttpError.Unauthorized(AuthMessage.Login);

    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (typeof data === "object" && "id" in data) {
      const user = await UserModel.findById(data.id, {
        otp: 0,
        __v: 0,
        updatedAt: 0,
        verifiedMobile: 0,
      }).lean();
      if (!user)
        throw new createHttpError.Unauthorized(AuthMessage.NotFoundAccount);

      req.user = user;

      return next();
    }

    throw new createHttpError.Unauthorized(AuthMessage.InvalidToken);
  } catch (error) {
    next(error);
  }
};

module.exports = AuthGuard;

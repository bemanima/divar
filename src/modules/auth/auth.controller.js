const { AuthMessage } = require("./auth.message");
const authService = require("./auth.service");
const autoBind = require("auto-bind");

const CookieNames = require("../../common/constant/cookie.enum");
const NodeEnv = require("../../common/constant/env.enum");

class AuthController {
  #service;

  constructor() {
    autoBind(this);
    this.#service = authService;
  }
  async sendOTP(req, res, next) {
    try {
      const { mobile } = req.body;
      const user = await this.#service.sendOTP(mobile);

      return res.json({
        message: AuthMessage.SendOTPSuccessfully,
        user,
      });
    } catch (error) {
      next(error);
    }
  }
  async checkOTP(req, res, next) {
    try {
      const { mobile, code } = req.body;
      const token = await this.#service.checkOTP(mobile, code);

      return res
        .cookie(CookieNames.AccessToken, token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === NodeEnv.Production,
        })
        .status(200)
        .json({
          message: AuthMessage.LoginSuccessfully,
        });
    } catch (error) {
      next(error);
    }
  }
  async logout(req, res, next) {
    try {
      return res.clearCookie(CookieNames.AccessToken).status(200).json({
        message: AuthMessage.LogoutSuccessfully,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();

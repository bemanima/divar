const ExceptionMessage = require("../messages/exeption.message");

const notFoundHandler = (app) => {
  app.use((req, res, next) => {
    res.status(404).json({
      message: ExceptionMessage.NotFoundRoute,
    });
  });
};

module.exports = notFoundHandler;

const express = require("express");
const dotenv = require("dotenv");

const connectToDB = require("./src//config/mongo.config");
const SwaggerConfig = require("./src/config/swagger.config");
const mainRouter = require("./src/app.routes");
const notFoundHandler = require("./src/common/exception/not-found.handler");
const allExceptionHandler = require("./src/common/exception/all-exception.handler");
const cookieParser = require("cookie-parser");

dotenv.config();

async function main() {
  const app = express();

  const port = process.env.PORT;

  connectToDB();

  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(cookieParser(process.env.COOKIE_SECRET_KEY));

  app.use(mainRouter);

  SwaggerConfig(app);

  notFoundHandler(app);
  allExceptionHandler(app);

  app.listen(port, () => {
    console.log(`Server run on port ${port} => http://localhost:${port}`);
  });
}

main();

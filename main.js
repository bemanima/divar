const express = require("express");
const dotenv = require("dotenv");

const connectToDB = require("./src//config/mongo.config");
const SwaggerConfig = require("./src/config/swagger.config");
const mainRouter = require("./app.routes");

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

  SwaggerConfig(app);

  app.use(mainRouter);

  app.listen(port, () => {
    console.log(`Server run on port ${port} => http://localhost:${port}`);
  });
}

main();

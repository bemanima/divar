const express = require("express");
const dotenv = require("dotenv");

const connectToDB = require("./src//config/mongo.config");
const SwaggerConfig = require("./src/config/swagger.config");

dotenv.config();

async function main() {
  const app = express();

  const port = process.env.PORT;

  connectToDB();

  SwaggerConfig(app);

  app.listen(port, () => {
    console.log(`Server run on port ${port} => http://localhost:${port}`);
  });
}

main();

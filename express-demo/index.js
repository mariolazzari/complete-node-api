const Joi = require("joi");
const express = require("express");
const logger = require("./middleware/logger");
const auth = require("./middleware/auth");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();
app.use(logger);
app.use(auth);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());

// enable logger only in dev enviroment
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan logger is enabled");
}

app.use("/api/courses", require("./routes/courses"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express stated on port ${PORT}`));

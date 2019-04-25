const express = require("express");
const logger = require("./logger");
const auth = require("./auth");

// express setup
const port = process.env.port || 3000;
const app = express();

// express middleware
app.use(express.json());
app.use(logger);
app.use(auth);
// start server
app.listen(port, () => console.log(`Express started on port ${port}.`));

const hello = name => {
  console.log(`Hello ${name}`);
};

hello("Mario");

console.log(module);

// import module
const logger = require("./logger");

console.log(logger);
logger.log("test log");

// Authorization middleware
const auth = (req, res, next) => {
  console.log("Authentication...");
  next();
};

module.exports = auth;

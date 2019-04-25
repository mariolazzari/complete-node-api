// Authorization middleware
const auth = (req, res, next) => {
  console.log("Authorizarion");
  next();
};

module.exports = auth;

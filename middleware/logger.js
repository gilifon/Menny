const moment = require("moment");
const logger = (req, res, next) => {
  console.log(
    `${req.protocol}://${req.get("host")}${
      req.originalUrl
    }\t\t${moment().format()}`
  );
  next();
};

module.exports = logger;

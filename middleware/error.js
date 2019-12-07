const winston = require('winston');
module.exports = function(err, req, res, next) {
  // log exception
  winston.error(err.message);
  // error
  // warn
  // info
  // verbose
  // debug
  // silly
  res.status(500).send('Something failed');
};

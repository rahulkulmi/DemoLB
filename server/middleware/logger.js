'use strict';
var winston = require('winston');
// var fs = require('fs');
var path = require('path');

var logDirectory = path.join(__dirname, '../../logs');
// fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
winston.emitErrs = true;

var logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: path.join(logDirectory, 'request.log'),
      handleExceptions: true,
      json: false,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    }),
  ],
  exitOnError: false,
});

logger.format = ':remote-addr :remote-user ":method :url :status' +
  ' :response-time ms :res[content-length] HTTP/:http-version" ":user-agent"';

logger.stream = {
  write: function(message, encoding) {
    logger.info(message);
  },
};

module.exports = logger.format;
module.exports = logger.stream;
module.exports = logger;

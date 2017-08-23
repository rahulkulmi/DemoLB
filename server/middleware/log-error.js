'use strict';
var resParser = require('../../utility/response-parser');
var appException = require('../../utility/exceptions');

module.exports = function() {
  return function logError(err, req, res, next) {
    // console.log('ERROR', req.url, err);
    // var statusCode = err.coreException.statusCode || 500;
    var statusCode = err.status || err.statusCode || 500;
    if (err && err.coreException && err.coreException.statusCode) {
      statusCode = err.coreException.statusCode;
    }
    if (!err.processingTimeMillis && !err.success && !err.data) {
      if (statusCode === 401) {
        err = resParser.errorResponse(appException.NOT_AUTHORIZED(), err);
      } else if (statusCode === 404) {
        err = resParser.errorResponse(appException.URL_NOT_FOUND(), err);
      } else {
        err = resParser.errorResponse(
          appException.INTERNAL_SERVER_ERROR(), err.stack);
      }
    }
    res.status(statusCode).send(err);
    next(err);
  };
};

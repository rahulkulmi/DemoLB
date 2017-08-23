'use strict';
var logger = require('../server/middleware/logger');

// public
var api = {};

api['successResponse'] = function(data, customMsg) {
  var response = {
    'success': true,
    'data': data,
    'error': null,
    'customMsg': null,
    'processingTimeMillis': (new Date().getTime() - global.start),
  };

  global.start = null;
  if (customMsg) {
    response['customMsg'] = customMsg;
  }
  // logger.warn('Success Response: %j', response);

  return response;
};

api['errorResponse'] = function(appError, coreException) {
  var response = {
    'success': false,
    'data': null,
    'error': appError.message,
    'customMsg': null,
    'processingTimeMillis': (new Date().getTime() - global.start),
    'coreException': null,
  };

  global.start = null;
  if (appError.customMsg) {
    response['customMsg'] = appError.customMsg;
  }
  if (coreException) {
    response['coreException'] = coreException;
  }
  logger.warn('Error Response: %j', response);

  return response;
};

module.exports = api;

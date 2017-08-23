'use strict';

// public
var exception = {};

exception['NOT_AUTHORIZED'] = function(customMsg) {
  return {'customMsg': customMsg,
    'message': 'No authorization'};
};

exception['INTERNAL_SERVER_ERROR'] = function(customMsg) {
  return {'customMsg': customMsg,
    'message': 'Server encountered some problem'};
};

exception['BAD_REQUEST'] = function(customMsg) {
  return {'customMsg': customMsg,
    'message': 'Bad request'};
};

exception['FILE_NOT_FOUND'] = function(customMsg) {
  return {'customMsg': customMsg,
    'message': 'File not found'};
};

exception['RECORD_NOT_FOUND'] = function(customMsg) {
  return {'customMsg': customMsg,
    'message': 'Record not found'};
};

exception['URL_NOT_FOUND'] = function(customMsg) {
  return {'customMsg': customMsg,
    'message': 'Request url not found'};
};

exception['VERIFICATION_EXCEPTION'] = function(customMsg) {
  return {'customMsg': customMsg,
    'message': 'Verification exception.'};
};

exception['VALIDATION_EXCEPTION'] = function(customMsg) {
  return {'customMsg': customMsg,
    'message': 'Bad request'};
};

module.exports = exception;

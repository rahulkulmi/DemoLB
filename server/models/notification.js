'use strict';
var resParser = require('../../utility/response-parser');
var appException = require('../../utility/exceptions');

module.exports = function(Notification) {
  var badge = 1;

  // DEFINING A PROPERTY IN NOTIFICATION FOR SENDING  PUSH MESSAGE
  Notification.sendMessage = function(message, registrationId, from, callback) {
    var app = this.app;
    from = from ? from : 'COMPANY_NAME';
    sendMessage(app, message, registrationId, from, callback);
  }; // sendMessage Notification method..

  // FUNCTION FOR SENDING PUSH MESSAGE..
  var sendMessage = function(app, message, registrationId, from, callback) {
    var Application = app.models.application;
    var PushModel = app.models.push;

    var note = new Notification({
      expirationInterval: 3600, // Expires 1 hour from now.
      // contentAvailable: true,
      badge: 1,
      sound: 'ping.aiff',
      message: message,
      // deviceType: 'android',
      messageFrom: from,
    });

    PushModel.notifyById(registrationId, note, function(err) {
      console.log('inside notifyById');
      if (err) {
        console.error('Cannot notify %j: %s', registrationId, err.stack);
        callback(err);
      }
      console.log('Pushing notification to %j', registrationId);
      var successResponse = resParser.successResponse('OK');
      callback(null, successResponse);
    });
  }; // sendMessage function

  // Now registering the method
  Notification.remoteMethod('sendMessage', {
    accepts: [
      {arg: 'message', type: 'string', required: true},
      {arg: 'registrationId', type: 'string', required: true},
      {arg: 'from', type: 'string', required: true},
    ],
    description: 'Sending message from notification..',
    returns: {arg: 'data', type: Notification, root: true},
  });
};

'use strict';

module.exports = function(Provider) {
  // To disable the rest api root.
  Provider.disableRemoteMethodByName('deleteById');

  // Provider.beforeRemote('create', function(context, user, next) {
  //   // context.args.data.date = Date.now();
  //   context.args.data.jobId = context.req.accessToken.userId;
  //   next();
  // });

  // status api for check business timing
  Provider.status = function(cb) {
    var currentDate = new Date();
    var currentHour = currentDate.getHours();
    var OPEN_HOUR = 6;
    var CLOSE_HOUR = 20;
    console.log('Current hour is %d', currentHour);
    var response;
    if (currentHour > OPEN_HOUR && currentHour < CLOSE_HOUR) {
      response = 'We are open for business.';
    } else {
      response = 'Sorry, we are closed. Open daily from 6am to 8pm.';
    }
    cb(null, response);
  };
  Provider.remoteMethod('status', {
    http: {path: '/status', verb: 'get'},
    returns: {arg: 'status', type: 'string'},
  });

  // get name api for getting provider name
  Provider.getName = function(proId, cb) {
    Provider.findById(proId, function(err, instance) {
      if (err) return cb(err);
      console.log(instance);
      var response = 'Name of provider is : ' + instance.name;
      console.log(response);
      cb(null, response);
    });
  };
  Provider.remoteMethod('getName', {
    http: {path: '/getName', verb: 'get'},
    accepts: {arg: 'id', type: 'number', http: {source: 'query'}},
    returns: {arg: 'name', type: 'string'},
  });
};

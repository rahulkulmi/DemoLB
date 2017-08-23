'use strict';

module.exports = function(Job) {
  // Job.disableRemoteMethodByName('create');
  // Job.disableRemoteMethodByName('upsert');
  // Job.disableRemoteMethodByName('updateAll');
  // Job.disableRemoteMethodByName('prototype.updateAttributes');

  // Job.disableRemoteMethodByName('find');
  // Job.disableRemoteMethodByName('findById');
  // Job.disableRemoteMethodByName('findOne');

  // Job.disableRemoteMethodByName('deleteById');
  //
  // Job.disableRemoteMethodByName('confirm');
  // Job.disableRemoteMethodByName('count');
  // Job.disableRemoteMethodByName('exists');
  // Job.disableRemoteMethodByName('resetPassword');
  //
  // Job.disableRemoteMethodByName('prototype.__count__accessTokens');
  // Job.disableRemoteMethodByName('prototype.__create__accessTokens');
  // Job.disableRemoteMethodByName('prototype.__delete__accessTokens');
  // Job.disableRemoteMethodByName('prototype.__destroyById__accessTokens');
  // Job.disableRemoteMethodByName('prototype.__findById__accessTokens');
  // Job.disableRemoteMethodByName('prototype.__get__accessTokens');
  // Job.disableRemoteMethodByName('prototype.__updateById__accessTokens');

  // get name api for getting provider name
  Job.getDetail = function(jobId, cb) {
    // var ds = Job.dataSource;
    // var sql = 'SELECT * FROM jobs WHERE city=?';
    // ds.connector.query(sql, jobCity, function(err, jobRes) {
    //   if (err) console.error(err);
    //   cb(err, jobRes);
    // });
    // returns: { arg: 'data', type: ['Job'], root: true }
    var fl = {fields: {id: true, city: true, zip: true}};
    Job.findById(jobId, fl, function(err, instance) {
      if (err) return cb(err);
      console.log(instance);
      cb(null, instance);
    });
  };
  Job.remoteMethod('getDetail', {
    http: {path: '/getDetail', verb: 'get'},
    accepts: {arg: 'id', type: 'string', http: {source: 'query'}},
    returns: {arg: 'data', type: Job, root: true},
  });
  // override find method
  // Job.on('dataSourceAttached', function(obj) {
  //   console.log('inside the find method');
  //   var find = Job.find;
  //   Job.find = function(filter, cb) {
  //     return find.apply(this, arguments);
  //   };
  // });
};

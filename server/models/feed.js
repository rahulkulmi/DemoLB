'use strict';
var resParser = require('../../utility/response-parser');
var appException = require('../../utility/exceptions');

module.exports = function(Feed) {
  // Feed.disableRemoteMethodByName('create');
  // Feed.disableRemoteMethodByName('upsert');
  // Feed.disableRemoteMethodByName('updateAll');
  // Feed.disableRemoteMethodByName('prototype.updateAttributes');
  //
  // Feed.disableRemoteMethodByName('find');
  // Feed.disableRemoteMethodByName('findById');
  // Feed.disableRemoteMethodByName('findOne');
  //
  // Feed.disableRemoteMethodByName('deleteById');
  //
  // Feed.disableRemoteMethodByName('confirm');
  // Feed.disableRemoteMethodByName('count');
  // Feed.disableRemoteMethodByName('exists');
  // Feed.disableRemoteMethodByName('resetPassword');
  //
  // Feed.disableRemoteMethodByName('createChangeStream');
  // Feed.disableRemoteMethodByName('replaceOrCreate');
  // Feed.disableRemoteMethodByName('replaceById');
  // Feed.disableRemoteMethodByName('upsertWithWhere');

  // override find method
  Feed.on('dataSourceAttached', function(obj) {
    var find = Feed.find;
    Feed.find = function(filter, cb) {
      return find.apply(this, arguments);
    };
  });

  // get feeds
  Feed.getFeeds = function(cb) {
    // var fl = {fields: {id: true, city: true, zip: true}};
    // Feed.findById(FeedId, fl, function(err, instance) {
    // Feed.find(function(err, instance) {
    //   if (err) return cb(err);
    //   console.log(instance);
    //   cb(null, instance);
    // });
    Feed.find()
    .then(function(result) {
      var successResponse = resParser.successResponse(result);
      // throw new Error('`foo` has been removed in favor of `bar`');
      // process.exit(1);
      cb(null, successResponse);
    })
    .catch(function(err) {
      cb(resParser.errorResponse(
        appException.INTERNAL_SERVER_ERROR(), err.stack));
    });
  };
  Feed.remoteMethod('getFeeds', {
    description: 'Get all feeds',
    http: {path: '/feeds', verb: 'get'},
    // accepts: {arg: 'id', type: 'string', http: {source: 'query'}},
    returns: {arg: 'data', type: Array[Feed], root: true},
  });

  // Feed.remoteMethod('getFeeds', getFeedsConfig());
  //
  // function getFeedsConfig() {
  // //
  // // {
  // //   description: 'Get all feeds',
  // //   http: {path: '/feeds', verb: 'get'},
  // //   // accepts: {arg: 'id', type: 'string', http: {source: 'query'}},
  // //   returns: {arg: 'data', type: Array[Feed], root: true},
  // // }
  // };
  //
  // function getFeeds(cb) {
  //   // var fl = {fields: {id: true, city: true, zip: true}};
  //   // Feed.findById(FeedId, fl, function(err, instance) {
  //   Feed.find()
  //   .then(function(result) {
  //     cb(null, result);
  //   })
  //   .catch(function(err) {
  //     cb(err);
  //   });
  // };

  // create feeds
  Feed.createFeeds = function(
    options, productId, friendId, productName, createdAt, cb) {
    var feedJson = {
      'productId': productId,
      'friendId': friendId,
      'productName': productName,
      'createdAt': createdAt,
    };
    // console.log('feedJson');
    // console.log(feedJson);
    var token = options && options.accessToken;
    // console.log(token);
    var userId = token && token.userId;
    // console.log(userId);
    // feedJson['userId'] = userId;
    console.log(feedJson);
    // console.log(options.accessToken);
    // console.log(options.accessToken.userId);
    // cb(null, 'success');
    // var fl = {fields: {id: true, city: true, zip: true}};
    // Feed.findById(FeedId, fl, function(err, instance) {
    //
    // Feed.create(feedJson, function(err, instance) {
    //   if (err) return cb(err);
    //   console.log(instance);
    //   cb(null, instance);
    // });
    //
    Feed.create(feedJson)
    .then(function(result) {
      var successResponse = resParser.successResponse(result);
      cb(null, successResponse);
    })
    .catch(function(err) {
      console.log(err);
      cb(resParser.errorResponse(
        appException.INTERNAL_SERVER_ERROR(), err.stack));
    });
  };
  Feed.remoteMethod('createFeeds', {
    http: {path: '/feeds', verb: 'post'},
    accepts: [
      {arg: 'options', type: 'object', http: 'optionsFromRequest'},
      // {arg: 'userId', type: 'number', required: true},
      {arg: 'productId', type: 'string', required: true},
      {arg: 'friendId', type: 'string', required: true},
      {arg: 'productName', type: 'string', required: true},
      {arg: 'createdAt', type: 'date', required: true},
    ],
    returns: {arg: 'data', type: Feed, root: true},
  });
};

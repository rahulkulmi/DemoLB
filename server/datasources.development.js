'use strict';

var MONGO_URI = 'mongodb://lt_db:hSipg7YgSA0YH2Ui@cluster0-shard-00-00-nwvbu.mongodb.net:27017,cluster0-shard-00-01-nwvbu.mongodb.net:27017,cluster0-shard-00-02-nwvbu.mongodb.net:27017/';
var MONGO_DB = 'DEV_LB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

module.exports = {
  db: {
    name: 'db',
    connector: 'memory',
  },
  mongoDB: {
    name: 'mongoDB',
    connector: 'mongodb',
    // url: process.env.MONGODB_URL,
    url: MONGO_URI + MONGO_DB,
    lazyConnect: false,
  },
  push: {
    name: 'push',
    connector: 'loopback-component-push',
    installation: 'installation',
    notification: 'notification',
    application: 'application',
  },
};

'use strict';

module.exports = {
  db: {
    name: 'db',
    connector: 'memory',
  },
  mongoDB: {
    name: 'mongoDB',
    connector: 'mongodb',
    url: process.env.MONGODB_URL,
  },
};

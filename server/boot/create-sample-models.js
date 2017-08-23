'use strict';

// var async = require('async');
// module.exports = function(app) {
//   // data sources
//   // var mongoDs = app.dataSources.mongoDs; // 'name' of your mongo connector, you can find it in datasource.json
//   var mysqlDs = app.dataSources.mysqlDs;
//   // create all models
//   async.parallel({
//     reviewers: async.apply(createProviders),
//     coffeeShops: async.apply(createJobs),
//   }, function(err, results) {
//     if (err) throw err;
//     console.log('all models created sucessfully');
//     // createReviews(results.reviewers, results.coffeeShops, function(err) {
//     //   console.log('> models created sucessfully');
//     // });
//   });
//   // create reviewers
//   function createProviders(cb) {
//     mysqlDs.automigrate('Provider', function(err) {
//       if (err) return cb(err);
//       var Provider = app.models.Provider;
//       Provider.create([{
//         name: 'rahul',
//         city: 'indore',
//       }, {
//         name: 'kulmi',
//         city: 'ujjain',
//       }, {
//         name: 'mayur',
//         city: 'ratlam',
//       }], cb);
//     });
//   }
//   // create coffee shops
//   function createJobs(cb) {
//     mysqlDs.automigrate('Job', function(err) {
//       if (err) return cb(err);
//       // var CoffeeShop = app.models.CoffeeShop;
//       // CoffeeShop.create([{
//       //   name: 'Bel Cafe',
//       //   city: 'Vancouver',
//       // }, {
//       //   name: 'Three Bees Coffee House',
//       //   city: 'San Mateo',
//       // }, {
//       //   name: 'Caffe Artigiano',
//       //   city: 'Vancouver',
//       // }], cb);
//     });
//   }
//   // create reviews
//   // function createReviews(reviewers, coffeeShops, cb) {
//   //   mysqlDs.automigrate('Review', function(err) {
//   //     if (err) return cb(err);
//   //     var Review = app.models.Review;
//   //     var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
//   //     Review.create([{
//   //       date: Date.now() - (DAY_IN_MILLISECONDS * 4),
//   //       rating: 5,
//   //       comments: 'A very good coffee shop.',
//   //       publisherId: reviewers[0].id,
//   //       coffeeShopId: coffeeShops[0].id,
//   //     }, {
//   //       date: Date.now() - (DAY_IN_MILLISECONDS * 3),
//   //       rating: 5,
//   //       comments: 'Quite pleasant.',
//   //       publisherId: reviewers[1].id,
//   //       coffeeShopId: coffeeShops[0].id,
//   //     }, {
//   //       date: Date.now() - (DAY_IN_MILLISECONDS * 2),
//   //       rating: 4,
//   //       comments: 'It was ok.',
//   //       publisherId: reviewers[1].id,
//   //       coffeeShopId: coffeeShops[1].id,
//   //     }, {
//   //       date: Date.now() - (DAY_IN_MILLISECONDS),
//   //       rating: 4,
//   //       comments: 'I go here everyday.',
//   //       publisherId: reviewers[2].id,
//   //       coffeeShopId: coffeeShops[2].id,
//   //     }], cb);
//   //   });
//   // }
// };

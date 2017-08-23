'use strict';
var log = require('./middleware/logger');

module.exports = function(app) {
  var Notification = app.models.notification;
  var Application = app.models.application;
  var PushModel = app.models.push;

  function startPushServer() {
    // Add our custom routes
    // var badge = 1;
    // app.post('/notify/:id', function(req, res, next) {
    //   var note = new Notification({
    //     expirationInterval: 3600, // Expires 1 hour from now.
    //     badge: badge--,
    //     sound: 'ping.aiff',
    //     alert: 'Hello this is a test msg.',
    //     messageFrom: 'Ray',
    //   });
    //
    //   PushModel.notifyById(req.params.id, note, function(err) {
    //     if (err) {
    //       console.error('Cannot notify %j: %s', req.params.id, err.stack);
    //       next(err);
    //       return;
    //     }
    //     console.log('pushing notification to %j', req.params.id);
    //     // res.send(200, 'OK');
    //     res.status(200).send('OK');
    //   });
    // });

    PushModel.on('error', function(err) {
      log.info(err);
      log.info('Push Notification error: ', err.stack);
      console.log(err);
      console.error('Push Notification error: ', err.stack);
    });

    // Pre-register an application that is ready to be used for testing.
    // You should tweak config options in ./config.js

    var config = require('./config');

    var loopbackApp = {
      // id: 'loopback-push-application',
      id: 'lb-test-176409',
      // id: 'my-project-1-1488451383639',
      // id: 'com.demoreactnative',
      userId: '556219170643',
      name: config.appName,

      description: 'LoopBack Push Notification Service',
      pushSettings: {
        // apns: {
        //   pushOptions: {
        //     // Extra options can go here for APN
        //     port: '2197',
        //   },
        //   feedbackOptions: {
        //     batchFeedback: true,
        //     interval: 300,
        //   },
        //   token: {
        //     keyId: config.apnsTokenKeyId,
        //     key: config.apnsTokenKeyPath,
        //     teamId: config.apnsTokenTeamId,
        //   },
        //   bundle: config.apnsBundleId,
        // },
        gcm: {
          serverApiKey: config.gcmServerApiKey,
        },
      },
    };

    updateOrCreateApp(function(err, appModel) {
      if (err) {
        throw err;
      }
      console.log('Application id: %j', appModel.id);
      log.info('Application id: %j', appModel.id);
    });

    // --- Helper functions ---
    function updateOrCreateApp(cb) {
      Application.findOne({
        where: {id: loopbackApp.id},
      },
      function(err, result) {
        if (err) cb(err);
        if (result) {
          // console.log(result);
          console.log('Updating application: - %s', result.id);
          log.info('Updating application: - %s', result.id);
          delete loopbackApp.id;
          result.updateAttributes(loopbackApp, cb);
        } else {
          return registerApp(cb);
        }
      });
    }

    function registerApp(cb) {
      console.log('Registering a new Application...');
      // Hack to set the app id to a fixed value so that we don't have to change
      // the client settings
      Application.beforeSave = function(next) {
        if (this.name === loopbackApp.name) {
          // this.id = 'loopback-push-application';
          // this.id = 'my-project-1-1488451383639';
          // this.id = 'com.demoreactnative';
          this.id = 'lb-test-176409';
        }
        next();
      };
      // Application.observe('before save', function(next) {
      //   if (this.name === demoApp.name) {
      //     this.id = 'com.demoreactnative';
      //   }
      //   next();
      // });
      // Application.beforeRemote('create', function(context, user, next) {
      //   // context.args.data.date = Date.now();
      //   context.args.data.jobId = context.req.accessToken.userId;
      //   next();
      // });
      Application.register(
        loopbackApp.userId,
        loopbackApp.name, {
          description: loopbackApp.description,
          pushSettings: loopbackApp.pushSettings,
        }, function(err, app) {
          if (err) {
            return cb(err);
          }
          return cb(null, app);
        }
      );
    }
  }

  startPushServer();
};

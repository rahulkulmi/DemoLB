'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var oauth2 = require('loopback-component-oauth2');
var logger = require('./middleware/logger');

var app = module.exports = loopback();

app.middleware('routes', function(req, res, next) {
  global.start = new Date().getTime();
  next();
});

app.use(require('morgan')('combined', {'stream': logger.stream}));
// app.use(require('morgan')(logger.format, {'stream': logger.stream}));

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  var options = {
    dataSource: app.dataSources.mongoDB, // Data source for oAuth2 metadata persistence
    loginPage: '/login', // The login page URL
    loginPath: '/login', // The login form processing URL
  };
  // add app and options inside oauth2
  oauth2.oAuth2Provider(
    app, // The app instance
    options // The options
  );
  // add api root to oauth2
  oauth2.authenticate(
    ['/api'],
    {session: false, scope: 'email'}
  );

  // require('./push-service')(app);

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

'use strict';

module.exports = function(app) {
  var router = app.loopback.Router();

  // Install a "/ping" route that returns "pong"
  router.get('/ping', function(req, res) {
    res.send('pong');
  });

  // Install a "/add" route that returns "add of two number"
  router.post('/api/add', function(req, res) {
    // console.log(req);
    // console.log(req.params);
    // console.log(req.query);
    console.log(req.body);
    var x = req.body.X;
    var y = req.body.Y;
    console.log('Sum of X: ', x, ', and Y: ', y, ' = ', (x + y));
    var msg = 'Sum of X: ' + x + ', and Y: ' + y + ' = ' + (x + y);
    res.send(msg);
  });
  app.use(router);
};

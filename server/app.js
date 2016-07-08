var express = require('express');
// var browserify = require('browserify-middleware');
var Path = require('path');
var questionsRouter = require('./controllers/questions');
var adminRouter = require('./controllers/admin');

// Middleware
var morgan = require('morgan');
var parser = require('body-parser');

var routes = express.Router();
var assetFolder = Path.resolve(__dirname, '..');
routes.use(express.static(assetFolder));

// Set up our routes
routes.use('/questions', questionsRouter);
routes.use('/admin', adminRouter);

routes.get('/', function (req, res) {
  res.sendFile(Path.resolve(assetFolder, 'client/main.html'));
});

if (process.env.NODE_ENV !== 'test') {

  // We're in development or production mode;
  // create and run a real server.
  var app = express();
  var port = process.env.PORT || 4400;

  // Mount our main router
  app.use(parser.json());
  app.use(parser.urlencoded({
    extended: true
  }));
  // Logging and parsing
  app.use(morgan('dev'));

  app.use('/', routes);
  app.listen(port);
  console.log("Listening on port", port);

} else {
  // We're in test mode; make this file importable instead.
  module.exports = routes;
}

require('dotenv').config(); // Load environment variables from .env file

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Bring in the database connection
require('./app_api/models/db'); // Ensure the database connection is established

var passport = require('passport');

require('./app_api/config/passport'); // Import passport configuration

// Define routers
var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var travelRouter = require('./app_server/routes/travel'); // Import the travel router 
var apiRouter = require('./app_api/routes/index'); // Import the API router

var handlebars = require('hbs');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));

//register handlebars partial views(https://www.npmjs.com/package/hbs)
handlebars.registerPartials(__dirname + '/app_server/views/partials');

app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // was false
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize()); // Initialize Passport for authentication

// Enable CORS 
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter); // Use the travel router for /travel routes
app.use('/api', apiRouter); // Use the API router for /api routes

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//Catch unauthorized error and create 401 
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res
    .status(401)
    .json({ message:err.name + ': ' + err.message });
  }
}); 


// error handler
app.use(function(err, req, res, next)  {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;

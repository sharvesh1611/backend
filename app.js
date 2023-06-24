var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
models=require('./models');
var passport = require('passport');
const cryptoService = require('./service/cryptoService');
const {to} = require('./globalfunction')
const cors=require('cors');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

models.sequelize.authenticate().then(()=>{
  console.log('Connected To DB');
}).catch((err)=>{
  console.log('not connected to db',err.message);
});
models.sequelize.sync({alter:false});

app.use(async function (req,res,next){
  if(req && req.headers && req.headers.authorization){
    [err,data] = await to(cryptoService.decrypt(req.headers.authorization));
    req.headers.authorization =  data;
    console.log('check123',req.headers.authorization);
  }
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Controll-Allow-Methods','GET,POST,PUT,PATCH,OPTIONS,DELETE');
  res.setHeader('Access-Controll-Allow-Headers','X-Requested-With,content-type,Authorization,Content-Type');
  res.setHeader('Access-Controll-Allow-Credentials',true);
  next();
});

app.use(passport.initialize());

app.use(cors({
  origin: "http://localhost:4200"
}));

app.use('/sign',require('./controller/signLog.controller').router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

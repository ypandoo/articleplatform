var express = require('express')
var path = require('path')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var routes = require('./routes/index')
var user = require('./routes/user')
var category = require('./routes/category')
var article = require('./routes/article')
var section = require('./routes/section')
var file = require('./routes/file')
var param = require('./routes/param')
var menu = require('./routes/menu')

var app = express()
var cors = require('cors')
app.use(cors())

var env = process.env.NODE_ENV || 'development'
app.locals.ENV = env
app.locals.ENV_DEVELOPMENT = env === 'development'

// view engine setup

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes)
app.use('/user', user)
app.use('/category', category)
app.use('/article', article)
app.use('/section', section)
app.use('/file', file)
app.use('/param', param)
app.use('/menu', menu)

// db
var mongoose = require('mongoose')
require('express-mongoose')
Promise = require('bluebird');
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/xincheng')

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})

// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        })
    })
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    })
})

module.exports = app

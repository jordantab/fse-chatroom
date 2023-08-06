require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');

// routes
var chatsRouter = require('./routes/chats');
var usersRouter = require('./routes/users');

// socket.io setup
var app = express();
let io;

// change favicon
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));

// mongodb setup
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

const messageController = require('./controllers/messageController')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// passport.js setup
const passport = require('passport')
const initializePassport = require('./configs/passport')
initializePassport(passport)

// sessions setup
const flash = require('express-flash')
const session = require('express-session')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use('/', usersRouter);
app.use('/chatroom', chatsRouter)

// Initialize io
app.set('socketio', (ioInstance) => {
  io = ioInstance;

  io.on('connection', (socket) => {
    console.log('New user connected')

    // Listen for a chat message
    socket.on('chat message', async (msg) => {
      // Save message to the db
    await messageController.saveMessage(msg)
    .then((savedMessage) => {
      io.emit('new message', savedMessage)
    })
    .catch((err) => {
      console.log('An error occured:', err)
    })

    })
    
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
  });
});

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

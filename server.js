const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const slash = require('express-slash');

// Controllers
const homeRouter = require('./api/home/routes');
const userRouter = require('./api/users/routes');
const { Server } = require('tls');

// initialization
const server = express();

// settings

server.set('port', 9000);
server.set('views', path.join(__dirname, 'views'));
server.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(server.get('views'), 'layouts'),
    partialsDir: path.join(server.get('views'), 'partials'),
    extname: '.hbs'
}));
server.set('view engine', '.hbs');

// middlewares
server.use(session({
  secret: 'config.secret',
  resave: true,
  saveUninitialized: true
}));
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended: false}));
server.use(flash());

// Global Variables
server.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// routes
server.use('/', homeRouter);
server.use('/', userRouter);

module.exports = server;

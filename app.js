var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var User = require('./server/models/user');
// var routes = require('./routes/index');

var authHelpers = require('./helpers');
var bcrypt = require('bcryptjs');

var books = require('./routes/books');
var tags = require('./routes/tags');
var users = require('./routes/users');

var app = express();
var Strategy = require('passport-local').Strategy;
var passport = require('passport');
var models = require('./server/models/index');

var db = require('./db');

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
// passport.use(new Strategy(
//   function(username, password, cb) {
    
//     // models.user.findOne({
//     //   where:{
//     //     username:username
//     //   }
//     // }).then(function(user){
//     //   if (err) { return cb(err); }
//     //   if (!user) { return cb(null, false); }
//     //   if (user.password != password) { return cb(null, false); }
//     //   return cb(null, user);
//     // });

//     db.users.findByUsername(username, function(err, user) {
//       if (err) { return cb(err); }
//       if (!user) { return cb(null, false); }
//       if (user.password != password) { return cb(null, false); }
//       return cb(null, user);
//     });

//   }));
passport.use(new Strategy(
    function(username, password, done){
        models.user.findOne({where:{username: username}}).then(function(user){
            
            var hashedPassword = bcrypt.hashSync(password, user.salt)
            if(!user) {
          
                return done(null, false, {message: 'Nom d\'usager incorrect.' });
            }
            if(!authHelpers.comparePass(password,user.password)){

                return done(null, false, { message: 'Mot de passe incorrect.' });
            }
            
            return done(null, user);
        });
    }
));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
  // console.log('serializeUser called');
  // console.log(user.username)
  cb(null, user.username);
});

passport.deserializeUser(function(username, cb) {
  // console.log(username)
  models.user.findOne({where:{username:username}}).then(function(user){
    // console.log('user')
    // console.log(user)
    // if(err){ console.log(err);return cb(err); }
    cb(null,user);
  });

  // db.users.findById(id, function (err, user) {
  //   if (err) { return cb(err); }
  //   console.log(user)
  //   cb(null, user);
  // });
});





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));



// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     console.log('in functionrs')
//     models.user.findOne({
//       where: {
//         'username': username
//       }
//     }).then(function(user){
//       console.log(user);
//     });
//     // models.user.findAll({where:{email:"doemsche@gmx.ch"}}).then((user)=>{
//     //   console.log(arguments)
//     //   console.log('promise')
//     //   console.log(user.password)
//     //   if (err) { return done(err); }
//     //   if (!user) { return done(null, false); }
//     //   console.log(password)
//     //   if (!user.verifyPassword(password)) { return done(null, false); }
//     //   return done(null, user);
//     // });
    
//   }
// ));


// app.use('/', routes);
app.use('/books', books);
app.use('/tags', tags);
app.use('/users', users);


// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     models.user.findOne({
//       where: {
//         'username': username
//       }
//     }).then(function (user) {
//       if (user == null) {
//         return done(null, false, { message: 'Incorrect credentials.' })
//       }
        
//       var hashedPassword = bcrypt.hashSync(password, user.salt)
        
//       if (user.password === hashedPassword) {
//         return done(null, user)
//       }
        
//       return done(null, false, { message: 'Incorrect credentials.' })
//     })
//   }
// ))

// app.post('/login', function(){
//   console.log(passort)
// })

app.get('/',
  function(req, res){
    res.render('index');
  });


app.get('/login',
  function(req, res){
    res.render('login');
  });
app.get('/logout', logout);
  function logout(req, res){
    if(req.isAuthenticated()){
      req.logout();
      // req.session.messages = req.i18n.__("Log out successfully");
    }
      res.redirect('/');
  }
app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    // console.log('affenarsch')
    res.redirect('/books');
  });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});




module.exports = app;

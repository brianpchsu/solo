var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;
var githubcode = require('./githubapp.js');
var auth = require('./auth.js');

var app = express();
app.use(cookieParser());
app.use(partials());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(expressSession({secret:'GithubsagabyBrian'}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GithubStrategy({
  clientID: githubcode.clientID,
  clientSecret: githubcode.secret,
  callbackURL: 'http://127.0.0.1:5678/auth/callback'
}, function(accessToken, refreshToken, profile, done){
  done(null, {
    accessToken: accessToken,
    profile: profile
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get('/auth', passport.authenticate('github'));
app.get('/auth/error', auth.error);
app.get('/auth/callback',
  passport.authenticate('github', {failureRedirect: '/auth/error'}),
  auth.callback
);

var handleGet = function(reqest, response){
  response.send({results: Object})
}


app.listen(5678);
// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var passport = require('passport'),
  mongoose = require('mongoose'),
  LocalStrategy = require('passport-local').Strategy;

// Define the Passport configuration method
module.exports = function() {

  // Load the 'User' model
  var User = mongoose.model('User');

  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));

  // Use Passport's 'serializeUser' method to serialize the user
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  // Use Passport's 'deserializeUser' method to load the user document
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

};
// Invoke 'strict' JavaScript mode
'use strict';

// TODO - Load the correct configuration file according to the 'NODE_ENV' variable
// module.exports = require('./env/' + process.env.NODE_ENV + '.js');

// Set the 'development' environment configuration object
module.exports = {
  db: 'mongodb://localhost/test',
  sessionSecret: 'developmentSessionSecret',
  facebook: {
    clientID: 'Facebook Application ID',
    clientSecret: 'Facebook Application Secret',
    callbackURL: 'http://localhost:3000/oauth/facebook/callback'
  }
};
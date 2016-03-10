'use strict';
var mongoose = require('mongoose');
var crypto = require('crypto');

var Schema = mongoose.Schema;

var UserSchema=new Schema({
  username:String,
  password:String,
  email:String,
  agree:{type:Boolean, default: false},
  salt:String
});


UserSchema.pre('save', function(next) {
  if (this.password) {
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    this.password = this.hashPassword(this.password);
  }

  next();
});

// Create an instance method for hashing a password
UserSchema.methods.hashPassword = function(password) {
  return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

// Create an instance method for authenticating user
UserSchema.methods.validPassword = function(password) {
  return this.password === this.hashPassword(password);
};



module.exports = mongoose.model("User",UserSchema);
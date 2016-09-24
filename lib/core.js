var User = require('./user');
var List = require('./list');
var Client = require('./client');
var Emailverify = require('./emailverify');
var Appointment = require('./appointment');
module.exports = {
  get $User () {
    return User;
  },

  get $List () {
    return List;
  },

  get $Client () {
    return Client;
  },

  get $Emailverify () {
    return Emailverify;
  },

  get $Appointment () {
    return Appointment;
  }
};

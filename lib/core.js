var User = require('./user');
var List = require('./list');
var Client = require('./client');
var Emailverify = require('./emailverify');
var Appointment = require('./appointment');
var Calendar = require('./calendar');
var Siteblog = require('./siteblog');
var Feedback = require('./feedback');
var FeedbackTemplate = require('./feedback-template');
var Company = require('./company');
var Agent = require('./Agent');

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
  },

  get $Calendar () {
    return Calendar;
  },

  get $Siteblog () {
    return Siteblog;
  },

  get $Feedback () {
    return Feedback;
  },

  get $FeedbackTemplate () {
    return FeedbackTemplate;
  },

  get $Company () {
    return Company;
  },

  get $Agent () {
    return Agent;
  }
};

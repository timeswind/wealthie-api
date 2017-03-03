var mongoose = require('mongoose');
var config = require('config-lite').mongodb;

mongoose.Promise = global.Promise;
mongoose.connect(config.url, function (err) {
  if (err) {
    console.error('connect to %s error: ', config.url, err.message);
    process.exit(1);
  }
});

exports.User = require('./User');
exports.List = require('./List');
exports.Client = require('./Client');
exports.Emailverify = require('./Emailverify');
exports.Appointment = require('./Appointment');
exports.Calendar = require('./Calendar');
exports.Siteblog = require('./Siteblog');
exports.Feedback = require('./Feedback');
exports.FeedbackTemplate = require('./FeedbackTemplate');
exports.Agent = require('./Agent');
exports.Company = require('./Company');
exports.Sharelist = require('./Sharelist');

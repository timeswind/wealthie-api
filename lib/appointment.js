var Appointment = require('../models').Appointment;
var moment = require('moment');
//新建一个LIST
exports.addOne = function (data) {
  return Appointment.create(data);
};

exports.findByClientId = function (client_id) {
  return Appointment.find({client: client_id}, "client date start end note status").lean()
};

exports.findByMonth = function (advisor_id, month, options) {
  var date = new Date()
  date.setMonth(month)

  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1);

  if (options && options.populate) {
    return Appointment.find({ advisor: advisor_id, date: { $gte: firstDay, $lte: lastDay }}, "client date start end note status").populate("client", "name").lean()
  } else {
    return Appointment.find({ advisor: advisor_id, date: { $gte: firstDay, $lte: lastDay }}, "client date start end note status").lean()
  }
}

exports.findByDate = function (advisor_id, date, options) {
  var start = new Date(date);
  start.setHours(0,0,0,0);

  var end = new Date(date);
  end.setHours(23,59,59,999);

  if (options && options.populate) {
    return Appointment.find({ advisor: advisor_id, date: { $gte: start, $lte: end }}, "client date start end note status").populate("client", "name").lean()
  } else {
    return Appointment.find({ advisor: advisor_id, date: { $gte: start, $lte: end }}, "client date start end note status").lean()
  }
}

exports.InThirtyDays = function (advisor_id, startDay, options) {
  var date = new Date(startDay)
  date.setHours(0,0,0,0);

  var firstDay = date
  var lastDay = moment(date).add(30, 'days').toDate();

  if (options && options.populate) {
    return Appointment.find({ advisor: advisor_id, date: { $gte: firstDay, $lte: lastDay }}, "client date start end note status").populate("client", "name").lean()
  } else {
    return Appointment.find({ advisor: advisor_id, date: { $gte: firstDay, $lte: lastDay }}, "client date start end note status").lean()
  }
}

exports.InThirtyDaysWithAdvisor = function (user_id, advisor_id, startDay, options) {
  var date = new Date(startDay)
  date.setHours(0,0,0,0);

  var firstDay = date
  var lastDay = moment(date).add(30, 'days').toDate();

  if (options && options.populate) {
    return Appointment.find({ advisor: advisor_id, date: { $gte: firstDay, $lte: lastDay }}, "client date start end note status").populate("client", "name").lean()
  } else {
    return Appointment.find({ advisor: advisor_id, date: { $gte: firstDay, $lte: lastDay }}, "client date start end note status").lean()
  }
}

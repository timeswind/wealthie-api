var Appointment = require('../models').Appointment;
//新建一个LIST
exports.addOne = function (data) {
  return Appointment.create(data);
};

exports.findByClientId = function (client_id) {
  return Appointment.find({client: client_id}, "client date start end note").lean()
};

exports.findByMonth = function (option, advisor_id, month) {
  var date;
  if (arguments.length === 2) {
    date = new Date();
  } else {
    date = new Date(month);
  }
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  if (option === 'populate') {
    return Appointment.find({ advisor: advisor_id, date: { $gte: firstDay, $lte: lastDay }}, "client date start end note").populate("client", "name").lean()
  } else {
    return Appointment.find({ advisor: advisor_id, date: { $gte: firstDay, $lte: lastDay }}, "client date start end note").lean()
  }
}

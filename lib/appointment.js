var Appointment = require('../models').Appointment;
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

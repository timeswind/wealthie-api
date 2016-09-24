var Appointment = require('../models').Appointment;
//新建一个LIST
exports.addOne = function (data) {
  return Appointment.create(data);
};

exports.findByClientId = function (client_id) {
  return Appointment.find({client: client_id}, "client date start end").lean()
};

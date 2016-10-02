var Calendar = require('../models').Calendar;
//新建一个LIST
exports.getCalendar = function (advisor_id, month) {
  return Calendar.findOne({advisor: advisor_id, month: month})
};

exports.getLatestCalendar = function (advisor_id) {
  return Calendar.findOne({advisor: advisor_id}).sort({month: -1}).exec()
};

exports.newCalendar = function (advisor_id, month) {
  return Calendar.create({advisor: advisor_id, month: month})
};

exports.newCalendarEvent = function (data) {
  // return Calendar.create(data);
};

var Calendar = require('../models').Calendar;
//新建一个LIST
exports.getCalendar = function (advisor_id, month, options) {
  if (options && options.lean) {
    return Calendar.findOne({advisor: advisor_id, month: month}).lean().exec()
  } else {
    return Calendar.findOne({advisor: advisor_id, month: month})
  }
};

exports.getLatestCalendar = function (advisor_id, options) {
  if (options && options.lean) {
    return Calendar.findOne({advisor: advisor_id}).sort({month: -1}).lean().exec()
  } else {
    return Calendar.findOne({advisor: advisor_id}).sort({month: -1}).exec()
  }
};

exports.newCalendar = function (advisor_id, month) {
  return Calendar.create({advisor: advisor_id, month: month})
};

exports.deleteEvent = function (advisor_id, calendar_id, event_id) {
  return Calendar.findOneAndUpdate({ advisor: advisor_id, _id: calendar_id }, { $pull:{ available: { _id: event_id } } }, { safe: true, new: true })
};

exports.getCalendarById = function (advisor_id, calendar_id) {
  return Calendar.findOne({ advisor: advisor_id, _id: calendar_id })
};

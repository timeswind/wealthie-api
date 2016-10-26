var Models = require('../../lib/core');
var _ = require('lodash');
var $Calendar = Models.$Calendar;
// var $Appointment = Models.$Appointment;

exports.get = function* () {
  let advisor_id = this.query.advisor_id
  var monthCode
  var month_index
  if (this.query.year) {
    monthCode = parseInt(this.query.year + ("0" + this.query.month).slice(-2))
    month_index = parseInt(this.query.month) - 1
  } else {
    monthCode = parseInt(new Date().getFullYear()+("0" + (new Date().getMonth() + 1)).slice(-2))
    month_index = new Date().getMonth()
  }
  var currentMonthCalendar = yield $Calendar.getCalendar(advisor_id, monthCode, { lean: true })
  // var currentMonthAppointments = yield $Appointment.findByMonth(advisor_id, month_index, {populate: true})
  // console.log(currentMonthAppointments)
 if (currentMonthCalendar) {
    this.status = 200
    this.body = {
      success: true,
      calendar: currentMonthCalendar
    }
  } else {
    var latestMonthCalendar = yield $Calendar.getLatestCalendar(advisor_id, { lean:true })
    if (latestMonthCalendar) {
      this.status = 200
      this.body = {
        success: true,
        calendar: latestMonthCalendar
      }
    } else {
      this.status = 200
      this.body = {
        success: true,
        calendar: null
      }
    }
  }
};

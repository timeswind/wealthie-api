var Models = require('../../lib/core');
var _ = require('lodash');
var $Calendar = Models.$Calendar;

exports.get = function* () {
  let advisor_id = this.query.advisor_id
  var monthCode = parseInt(new Date().getFullYear()+("0" + (new Date().getMonth() + 1)).slice(-2))

  if (this.query.year) {
    monthCode = parseInt(this.query.year + ("0" + this.query.month).slice(-2))
  }
  var currentMonthCalendar = yield $Calendar.getCalendar(advisor_id, monthCode)
  if (currentMonthCalendar) {
    this.status = 200
    this.body = {
      success: true,
      calendar: currentMonthCalendar.toJSON()
    }
  } else {
    var latestMonthCalendar = yield $Calendar.getLatestCalendar(advisor_id)
    if (latestMonthCalendar) {
      this.status = 200
      this.body = {
        success: true,
        calendar: latestMonthCalendar.toJSON()
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

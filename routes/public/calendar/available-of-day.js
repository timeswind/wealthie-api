var Models = require('../../../lib/core');
var _ = require('lodash');
var $Calendar = Models.$Calendar;
var $Appointment = Models.$Appointment;

exports.get = function* () {
  let advisor_id = this.query.advisor_id
  let date = new Date(this.query.date)
  var monthCode = parseInt(date.getFullYear() + ("0" + (date.getMonth() + 1)).slice(-2))
  var day = date.getDay()
  if (day === 0) {
    day = 7
  }
  var currentMonthCalendar = yield $Calendar.getCalendar(advisor_id, monthCode, { lean: true })
  if (currentMonthCalendar) {
    var appointmentsInfo = yield $Appointment.findByDate(advisor_id, date, {populate: true})
    currentMonthCalendar.available = _.filter(currentMonthCalendar.available, function(timeslot){return timeslot.day === day})
    if (appointmentsInfo) {
      appointmentsInfo.forEach((appointment)=>{
        let appointmentDate = new Date(appointment.date)
        let monthDay = appointmentDate.getDate()
        var weekDay = appointmentDate.getDay()
        let appointmentFrom = appointment.start
        let appointmentTo = appointment.end
        if (weekDay === 0) {
          weekDay = 7
        }
        currentMonthCalendar.available.map((calendar)=>{
          if (calendar.day === weekDay) {
            let calendarFrom = calendar.from
            let calendarTo = calendar.to
            if (appointmentFrom < calendarFrom && appointmentTo > calendarTo) {
              calendar = null
            } else if (appointmentFrom <= calendarFrom && appointmentTo <= calendarTo && appointmentTo > calendarFrom) {
              calendar.from = appointmentTo,
              calendar.to = calendarTo
            } else if (appointmentFrom >= calendarFrom && appointmentTo >= calendarTo && appointmentFrom < calendarTo) {
              calendar.from = calendarFrom,
              calendar.to = appointmentFrom
            }
          }
          return calendar
        })
      })
      this.status = 200
      this.body = {
        success: true
      }
      if (currentMonthCalendar.available) {
        this.body['available'] = currentMonthCalendar.available
      }
    } else {
      this.status = 200
      this.body = {
        success: true
      }
      let available = _.filter(currentMonthCalendar.available, function(timeslot){return timeslot.day === day})
      if (available) {
        this.body['available'] = available
      }
    }
  } else {
    this.status = 400
    this.body = {
      success: false
    }
  }
};

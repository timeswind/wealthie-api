var Models = require('../../lib/core');
var _ = require('lodash');
var $Calendar = Models.$Calendar;

exports.post = function* () {
  let advisor_id = this.state.user.id
  let currentMonthCode = parseInt(new Date().getFullYear()+("0" + (new Date().getMonth() + 1)).slice(-2))
  var newCalendarEvent = this.request.body

  var currentMonthCalendar = yield $Calendar.getCalendar(advisor_id, currentMonthCode)
  console.log(currentMonthCalendar)
  if (currentMonthCalendar) {
    currentMonthCalendar.available.push({
      day: newCalendarEvent.day,
      from: newCalendarEvent.from,
      to: newCalendarEvent.to
    })
    yield currentMonthCalendar.save()
    this.status = 200
    this.body = {
      success: true,
      calendar: currentMonthCalendar.toJSON()
    }
  } else {
    var newCalendar = yield $Calendar.newCalendar(advisor_id, currentMonthCode)
    newCalendar.available.push({
      day: newCalendarEvent.day,
      from: newCalendarEvent.from,
      to: newCalendarEvent.to
    })
    yield newCalendar.save()
    this.status = 200
    this.body = {
      success: true,
      calendar: newCalendar.toJSON()
    }
  }
};

exports.get = function* () {
  let advisor_id = this.state.user.id
  let currentMonthCode = parseInt(new Date().getFullYear()+("0" + (new Date().getMonth() + 1)).slice(-2))

  var currentMonthCalendar = yield $Calendar.getCalendar(advisor_id, currentMonthCode)
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

exports.delete = function* () {

  console.log(this.query)
  let advisor_id = this.state.user.id
  let type = this.query.type
  let calendar_id = this.query.calendarId
  let event_id = this.query.eventId
  //
  var updatedCalendar = yield $Calendar.deleteEvent(advisor_id, calendar_id, event_id)
  this.status = 200
  this.body = {
    success: true,
    calendar: updatedCalendar
  }
}

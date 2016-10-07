var Models = require('../../lib/core');
var _ = require('lodash');
var $Calendar = Models.$Calendar;

exports.post = function* () {
  let advisor_id = this.state.user.id
  var monthCode = parseInt(new Date().getFullYear()+("0" + (new Date().getMonth() + 1)).slice(-2))
  var newCalendarEvent = this.request.body
  if (newCalendarEvent.month && newCalendarEvent.year) {
    monthCode = parseInt(newCalendarEvent.year+("0" + (newCalendarEvent.month)).slice(-2))
  }
  var currentMonthCalendar = yield $Calendar.getCalendar(advisor_id, monthCode)
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
    var latestMonthCalendar = yield $Calendar.getLatestCalendar(advisor_id)
    var newCalendar = yield $Calendar.newCalendar(advisor_id, monthCode)

    if (latestMonthCalendar) {
      if (latestMonthCalendar.available.length > 0) {
        latestMonthCalendar.available.forEach((event)=>{
          newCalendar.available.push({
            day: event.day,
            from: event.from,
            to: event.to
          })
        })
      }
      newCalendar.available.push({
        day: newCalendarEvent.day,
        from: newCalendarEvent.from,
        to: newCalendarEvent.to
      })
    } else {
      newCalendar.available.push({
        day: newCalendarEvent.day,
        from: newCalendarEvent.from,
        to: newCalendarEvent.to
      })
    }

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
  var monthCode = parseInt(new Date().getFullYear()+("0" + (new Date().getMonth() + 1)).slice(-2))

  if (this.query.year) {
    monthCode = parseInt(this.query.year + ("0" + this.query.month).slice(-2))
  }
  console.log(monthCode)
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

exports.delete = function* () {

  let advisor_id = this.state.user.id
  let type = this.query.type
  let calendar_id = this.query.calendar_id
  let event_id = this.query.event_id

  var updatedCalendar = yield $Calendar.deleteEvent(advisor_id, calendar_id, event_id)

  this.status = 200
  this.body = {
    success: true,
    calendar: updatedCalendar
  }
}

var Models = require('../../lib/core');
var _ = require('lodash');
var $Calendar = Models.$Calendar;
var $Appointment = Models.$Appointment;

exports.post = function* () {
  let advisor_id = this.state.user.id
  var monthCode
  var newCalendarEvent = this.request.body
  var newEventObj = {
    from: newCalendarEvent.from,
    to: newCalendarEvent.to
  }
  if (newCalendarEvent.day) {
    newEventObj['day'] = newCalendarEvent.day
  }
  if (newCalendarEvent.date) {
    newEventObj['date'] = newCalendarEvent.date
  }
  if (newCalendarEvent.month && newCalendarEvent.year) {
    monthCode = parseInt(newCalendarEvent.year+("0" + (newCalendarEvent.month)).slice(-2))
  } else {
    monthCode = parseInt(new Date().getFullYear()+("0" + (new Date().getMonth() + 1)).slice(-2))
  }
  var currentMonthCalendar = yield $Calendar.getCalendar(advisor_id, monthCode)
  if (currentMonthCalendar) {
    currentMonthCalendar.available.push(newEventObj)
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
          var available = {
            from: event.from,
            to: event.to
          }
          if (event.day) {
            available['day'] = event.day
          }
          if (event.date) {
            available['date'] = event.date
          }
          newCalendar.available.push(available)
        })
      }
    }
    newCalendar.available.push(newEventObj)

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
  if (currentMonthCalendar) {
    var currentMonthAppointments = yield $Appointment.findByMonth(advisor_id, month_index, {populate: true})
    this.status = 200
    this.body = {
      success: true,
      calendar: currentMonthCalendar,
      appointments: currentMonthAppointments
    }
  } else {
    var latestMonthCalendar = yield $Calendar.getLatestCalendar(advisor_id, { lean: true })
    var currentMonthAppointments = yield $Appointment.findByMonth(advisor_id, month_index, {populate: true})
    if (latestMonthCalendar) {
      this.status = 200
      this.body = {
        success: true,
        calendar: latestMonthCalendar,
        appointments: currentMonthAppointments
      }
    } else {
      this.status = 200
      this.body = {
        success: true,
        calendar: null,
        appointments: null
      }
    }
  }
};

exports.put = function* () {

  let advisor_id = this.state.user.id
  let type = this.query.type
  let calendar_id = this.query.calendar_id
  let event_id = this.query.event_id
  let start = this.query.start
  let end = this.query.end

  var calendar = yield $Calendar.getCalendarById(advisor_id, calendar_id)

  if (calendar) {
    eventIndex = _.findIndex(calendar.available, function(o) { return o._id == event_id; });
    if (eventIndex >= 0) {
      calendar.available[eventIndex].from = start
      calendar.available[eventIndex].to = end
      yield calendar.save()
      this.status = 200
      this.body = {
        success: true,
        calendar: calendar
      }
    } else {
      this.status = 404
      this.body = {
        success: false,
        error: 'Calendar not found'
      }
    }
  } else {
    this.status = 404
    this.body = {
      success: false,
      error: 'Calendar not found'
    }
  }
}

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

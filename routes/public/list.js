var Models = require('../../lib/core');
var $List = Models.$List;
var $User = Models.$User;
var $Calendar = Models.$Calendar;
var $Appointment = Models.$Appointment;

exports.get = function* () {
  let idType = this.request.query.type
  if (idType === 'advisor') {
    var advisor_id = this.request.query.id
    var listInfo = yield $List.getByAdvisorId(advisor_id, "independent affiliation categories brief phone email experience address loc advisor")
    if (listInfo) {
      let advisor_id = listInfo.advisor
      var advisorInfo = yield $User.getById(advisor_id, "firstName lastName")
      if (advisorInfo) {
        this.status = 200;
        this.body = {
          success: true,
          listInfo: listInfo,
          advisorInfo: advisorInfo
        };
        return true
      } else {
        this.status = 404;
        this.body = {
          success: false,
          listInfo: null,
          advisorInfo: null
        };
      }

    } else {
      this.status = 404;
      this.body = {
        success: false,
        listInfo: null,
        advisorInfo: null
      };
    }
  } else {
    var list_id = this.request.query.id
    var listInfo = yield $List.getById(list_id, "independent affiliation categories brief phone email experience address loc advisor")
    if (listInfo) {
      let advisor_id = listInfo.advisor
      var monthCode
      var month_index
      if (this.query.year) {
        monthCode = parseInt(this.query.year + ("0" + this.query.month).slice(-2))
        month_index = parseInt(this.query.month) - 1
      } else {
        monthCode = parseInt(new Date().getFullYear()+("0" + (new Date().getMonth() + 1)).slice(-2))
        month_index = new Date().getMonth()
      }
      var advisorInfo = yield $User.getById(advisor_id, "firstName lastName")
      var calendarInfo = yield $Calendar.getCalendar(advisor_id, monthCode, { lean: true })
      console.log(calendarInfo)
      if (advisorInfo) {
        var appointmentsInfo = yield $Appointment.findByMonth(advisor_id, month_index, {populate: true})
        this.status = 200;
        this.body = {
          success: true,
          listInfo: listInfo,
          advisorInfo: advisorInfo
        };
        if (appointmentsInfo && calendarInfo && calendarInfo.available && calendarInfo.available.length > 0 && appointmentsInfo.length > 0) {
          appointmentsInfo.forEach((appointment)=>{
            let date = new Date(appointment.date)
            let monthDay = date.getDate()
            var weekDay = date.getDay()
            let appointmentFrom = appointment.start
            let appointmentTo = appointment.end

            if (weekDay === 0) {
              weekDay = 7
            }
            console.log(weekDay)
            calendarInfo.available.map((calendar)=>{
              if (calendar.day === weekDay) {
                let calendarFrom = calendar.from
                let calendarTo = calendar.to
                if (appointmentFrom < calendarFrom && appointmentTo > calendarTo) {
                  calendar = null
                } else if (appointmentFrom <= calendarFrom && appointmentTo <= calendarTo && appointmentTo > calendarFrom) {
                  calendar['exception'] = {}
                  calendar['exception'][monthDay.toString()] = {
                    from: appointmentTo,
                    to: calendarTo
                  }
                } else if (appointmentFrom >= calendarFrom && appointmentTo >= calendarTo && appointmentFrom < calendarTo) {
                  calendar['exception'] = {}
                  calendar['exception'][monthDay.toString()] = {
                    from: calendarFrom,
                    to: appointmentFrom
                  }
                }
              }
              return calendar
            })
          })
          this.body['calendar'] = calendarInfo
        } else if (calendarInfo) {
          this.body['calendar'] = calendarInfo
        }
      } else {
        this.status = 404;
        this.body = {
          success: false,
          listInfo: null,
          advisorInfo: null
        };
      }

    } else {
      this.status = 404;
      this.body = {
        success: false,
        listInfo: null,
        advisorInfo: null
      };
    }
  }


};

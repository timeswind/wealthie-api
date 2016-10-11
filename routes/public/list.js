var Models = require('../../lib/core');
var $List = Models.$List;
var $User = Models.$User;
var $Calendar = Models.$Calendar;

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
      let currentMonthCode = parseInt(new Date().getFullYear()+("0" + (new Date().getMonth() + 1)).slice(-2))

      var advisorInfo = yield $User.getById(advisor_id, "firstName lastName")
      var calendarInfo = yield $Calendar.getCalendar(advisor_id, currentMonthCode)

      if (advisorInfo) {
        this.status = 200;
        this.body = {
          success: true,
          listInfo: listInfo,
          advisorInfo: advisorInfo
        };
        if (calendarInfo) {
          this.body['calendar'] = calendarInfo
        }
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
  }


};

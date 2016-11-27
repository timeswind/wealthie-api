var Models = require('../../lib/core');
var $User = Models.$User;
var $List = Models.$List;
var $Appointment = Models.$Appointment;

exports.get = function* () {
  let user = this.state.user

  var userInfo = yield $User.getById(user.id, "firstName lastName role affiliation email verify")
  var listInfo = yield $List.getByUserId(user.id, "name phones brief categories independent affiliation experience addresses")
  var appointmentInfo = yield $Appointment.InThirtyDays(user.id, (new Date()), {populate: true})
  console.log(appointmentInfo)
  this.body = {}
  if (listInfo) {
    if (listInfo.loc === undefined) {
      listInfo.loc = [0, 0]
    }
    this.body['listInfo'] = listInfo
  } else {
    this.body['listInfo'] = false
  }
  if (appointmentInfo && appointmentInfo.length !== 0) {
    this.body['appointmentInfo'] = appointmentInfo
  } else {
    this.body['appointmentInfo'] = false
  }
  this.body.success = true
  this.body['userInfo'] = userInfo
};

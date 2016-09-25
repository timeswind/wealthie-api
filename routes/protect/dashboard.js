var Models = require('../../lib/core');
var $User = Models.$User;
var $List = Models.$List;
var $Appointment = Models.$Appointment;

exports.get = function* () {
  let user = this.state.user

  var userInfo = yield $User.getById(user.id, "firstName lastName role affiliation email verify")
  var listInfo = yield $List.getByUserId(user.id, "phone email brief categories independent affiliation experience loc address room")
  var appointmentInfo = yield $Appointment.findByMonth({populate: true}, user.id)
  this.body = {}
  if (listInfo) {
    if (listInfo.loc === undefined) {
      listInfo.loc = [0, 0]
    }
    this.body.listInfo = listInfo
  } else {
    this.body.listInfo = false
  }
  if (appointmentInfo) {
    this.body.appointmentInfo = appointmentInfo
  } else {
    this.body.appointmentInfo = false
  }
  this.body.success = true
  this.body.userInfo = userInfo
};

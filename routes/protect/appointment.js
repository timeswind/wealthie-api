var Models = require('../../lib/core');
var _ = require('lodash');
var $Appointment = Models.$Appointment;

exports.post = function* () {
  var newAppointmentData = this.request.body
  var advisor_id = this.state.user.id
  newClientData['advisor'] = advisor_id

  var newAppointment = yield $Appointment.addOne(newAppointmentData)

  if (newAppointment) {
    this.status = 200
    this.body = {
      success: true,
      newAppointment: newAppointment
    }
  } else {
    this.throw(500, 'Fail to add new client')
  }
};

var Models = require('../../../lib/core');
var _ = require('lodash');
var $Appointment = Models.$Appointment;

exports.get = function* (advisor_id) {
  let user_role = this.state.user.role
  let user_id = this.state.user.id
  if (user_role === 1) {
    var appointments = yield $Appointment.InThirtyDaysWithAdvisor(user_id, advisor_id, (new Date()))
    this.status = 200
    this.body = {
      success: true
    }
    if (appointments) {
      this.body['appointments'] = appointments
    } else {
      this.body['appointments'] = null
    }
  } else {
    this.status = 404
  }
}

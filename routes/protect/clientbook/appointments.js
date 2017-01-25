var Models = require('../../../lib/core');
var _ = require('lodash');
var $Appointment = Models.$Appointment;
exports.get = function* () {
  var client_id = this.request.query.id
  var appointments = yield $Appointment.findByClientId(client_id)
  if (appointments) {
    this.status = 200
    this.body = {
      success: true,
      appointments: appointments
    }
  } else {
    this.status = 500
    this.body = {
      success: false,
      error: 'Fail to get appointment'
    }
  }
};

var Models = require('../../lib/core');
var _ = require('lodash');
var $Client = Models.$Client;
var $Appointment = Models.$Appointment;

exports.get = function* () {
  // let user_role = this.state.user.role
  // if (user_role === 1) {
  //   var
  // } else {
  //   this.status = 404
  // }
}

exports.post = function* () {
  var newAppointmentData = this.request.body
  let user_role = this.state.user.role
  if (user_role === 1) {
    let user_id = this.state.user.id
    let advisor_id = newAppointmentData.advisor
    newAppointmentData['status'] = 'pending'
    newAppointmentData['user'] = user_id
    var client = yield $Client.getByUserAndAdvisor(user_id, advisor_id, '_id', { lean: true })

    if (client) {
      newAppointmentData['client'] = client._id
    } else {
      let user_name = this.state.user.name
      let user_email = this.state.user.email
      var newClient = yield $Client.newClient({
        advisor: advisor_id,
        user: user_id,
        name: user_name,
        email: user_email
      })
      newAppointmentData['client'] = newClient._id
    }
    console.log(newAppointmentData)
    var newAppointment = yield $Appointment.addOne(newAppointmentData)
    if (newAppointment) {
      this.status = 200
      this.body = {
        success: true
      }
    } else {
      this.status = 500
      this.body = {
        success: false
      }
    }
  } else {
    let client_id = newAppointmentData.client
    var advisor_id = this.state.user.id
    newAppointmentData['advisor'] = advisor_id
    newAppointmentData['status'] = 'scheduled'
    var client = yield $Client.getClient(client_id, 'user', { lean: true })
    if (client && client.user) {
      newAppointmentData['user'] = client.user
    }
    var newAppointment = yield $Appointment.addOne(newAppointmentData)

    if (newAppointment) {
      this.status = 200
      this.body = {
        success: true,
        newAppointment: newAppointment
      }
    } else {
      this.status = 500
      this.body = {
        success: false,
        newAppointment: null
      }
    }
  }
};

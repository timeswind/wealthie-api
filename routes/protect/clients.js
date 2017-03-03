var Models = require('../../lib/core');
var _ = require('lodash');
var $Client = Models.$Client;

exports.get = function* () {
  var advisor_id = this.state.user.id

  var clients = yield $Client.getClients(advisor_id, "name email phone gender married note categories age childrens job income address fields profile")

  if (clients) {
    this.status = 200
    this.body = {
      success: true,
      clients: clients
    }
  } else {
    this.status = 404
    this.body = {
      success: false,
      clients: null
    }
  }
};

exports.post = function* () {
  var newClientData = this.request.body
  var advisor_id = this.state.user.id
  newClientData['advisor'] = advisor_id

  var newClient = yield $Client.newClient(newClientData)

  if (newClient) {
    this.status = 200
    this.body = {
      success: true,
      client: newClient
    }
  } else {
    this.status = 500
    this.body = {
      success: false,
      error: 'Fail to add new client'
    }
  }
};

exports.put = function* () {
  var user_id = this.state.user.id
  var updatedClientDataCopy = JSON.parse(JSON.stringify(this.request.body))
  var updatedClientData = this.request.body
  let client_id = updatedClientData._id

  delete updatedClientData._id
  if (updatedClientData.advisor) {
    delete updatedClientData.advisor
  }
  console.log(updatedClientData)

  if (updatedClientData.profile && Object.keys(updatedClientData.profile).length > 0) {
    var filtered = Object.keys(updatedClientData.profile).filter(function(key) {
      return updatedClientData.profile[key] === true
    });
    updatedClientData.profile['rating'] = filtered.length
  }

  var updatedClient = yield $Client.updateClient(client_id, updatedClientData)
  if (updatedClient) {
    this.status = 200
    this.body = {
      success: true,
      client: updatedClientDataCopy
    }
  } else {
    this.status = 500
    this.body = {
      success: false,
      agent: null
    }
  }
};

exports.delete = function*() {
  var user_id = this.state.user.id
  var client_id = this.request.query.id

  var clientDeleted = yield $Client.deleteClient(client_id)

  if (clientDeleted) {
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
}

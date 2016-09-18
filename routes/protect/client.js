var Models = require('../../lib/core');
var _ = require('lodash');
var $Client = Models.$Client;

exports.post = function* () {
  var newClientData = this.request.body
  var advisor_id = this.state.user.id
  newClientData['advisor'] = advisor_id

  var newClient = yield $Client.newClient(newClientData)

  if (newClient) {
    this.status = 200
    this.body = {
      success: true,
      newClient: newClient
    }
  } else {
    this.throw(500, 'Fail to add new client')
  }
};

exports.get = function* () {
  var client_id = this.request.query.id

  var client = yield $Client.getClient(client_id, "name email phone sex note categories")

  if (client) {
    this.status = 200
    this.body = {
      success: true,
      client: client
    }
  } else {
    this.throw(500, 'Fail to get client')
  }
};

exports.patch = function* () {
  var patch = this.request.body
  var client_id = patch.id
  var fatchField = patch.field
  var newData = patch.data

  var patchedClient = $Client.patch(client_id, fatchField, newData)

  if (patchedClient) {
    this.status = 200
    this.body = {
      success: true
    }
  } else {
    this.throw(500, 'Fail to update ' + fatchField)
  }}

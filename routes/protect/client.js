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

var Models = require('../../lib/core');
var _ = require('lodash');
var $Client = Models.$Client;

exports.get = function* () {
  var advisor_id = this.state.user.id

  var clients = yield $Client.getClients(advisor_id, "name email sex categories")

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

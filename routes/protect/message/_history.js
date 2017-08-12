var Models = require('../../../lib/core');
var _ = require('lodash');
var $Message = Models.$Message;

exports.get = function* (contactUserId) {
  let user_role = this.state.user.role
  let user_id = this.state.user.id

  var history = yield $Message.fetchHistory(user_id, contactUserId);
  this.status = 200
  this.body = {
    success: true,
    history: history
  }
}

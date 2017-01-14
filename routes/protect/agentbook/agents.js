var Models = require('../../../lib/core');
var _ = require('lodash');
var $Agent = Models.$Agent;

exports.get = function* () {
  var user_id = this.state.user.id

  var agents = yield $Agent.getAgents(user_id, "manager referBy user joinAt meta isActive")

  if (agents) {
    this.status = 200
    this.body = {
      success: true,
      agents: agents
    }
  } else {
    this.status = 404
    this.body = {
      success: false,
      agents: null
    }
  }
};

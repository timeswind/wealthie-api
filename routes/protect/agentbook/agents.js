var Models = require('../../../lib/core');
var _ = require('lodash');
var $Agent = Models.$Agent;

exports.get = function* () {
  var user_id = this.state.user.id

  var agents = yield $Agent.getAgents(user_id, "manager name email phone referBy joinAt fields isActive note address")

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

exports.post = function* () {
  var user_id = this.state.user.id
  var newAgentData = this.request.body
  newAgentData['manager'] = user_id
  var newAgent = yield $Agent.newAgent(newAgentData)

  if (newAgent) {
    this.status = 200
    this.body = {
      success: true,
      agent: newAgent
    }
  } else {
    this.status = 500
    this.body = {
      success: false,
      agent: null
    }
  }
}

exports.put = function*() {
  var user_id = this.state.user.id
  var updatedAgentDataCopy = JSON.parse(JSON.stringify(this.request.body))
  var updatedAgentData = this.request.body
  let agent_id = updatedAgentData._id

  delete updatedAgentData._id
  if (updatedAgentData.manager) {
    delete updatedAgentData.manager
  }

  var updatedAgent = yield $Agent.updateAgent(agent_id, updatedAgentData)
  if (updatedAgent) {
    this.status = 200
    this.body = {
      success: true,
      agent: updatedAgentDataCopy
    }
  } else {
    this.status = 500
    this.body = {
      success: false,
      agent: null
    }
  }
}

exports.delete = function*() {
  var user_id = this.state.user.id
  var agent_id = this.request.query.id

  var agentDeleted = yield $Agent.deleteAgent(agent_id)

  if (agentDeleted) {
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

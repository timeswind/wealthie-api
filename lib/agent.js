var Agent = require('../models').Agent;
//新建一个LIST
exports.newAgent = function (data) {
  return Agent.create(data);
};

exports.getAgents = function (user_id, selectFields) {
  return Agent.find({manager: user_id}, selectFields).lean().exec();
}

exports.updateAgent = function (id, updatedAgentData) {
  return Agent.findOneAndUpdate({_id: id}, {$set: updatedAgentData}, { new: true }).exec();
}

exports.deleteAgent = function (id) {
  return Agent.findOneAndRemove({_id: id}).exec()
}

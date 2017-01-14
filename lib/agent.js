var Agent = require('../models').Agent;
//新建一个LIST
exports.newAgent = function (data) {
  return Agent.create(data);
};

exports.getAgents = function (user_id, selectFields) {
  return Agent.find({manager: user_id}, selectFields).lean().exec();
}

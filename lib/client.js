var Client = require('../models').Client;
var _  = require('lodash');
//新建一个LIST
exports.newClient = function (data) {
  return Client.create(data);
};

exports.getClients = function (advisor_id, selectFields) {
  return Client.find({advisor: advisor_id}, selectFields).lean().exec();
}

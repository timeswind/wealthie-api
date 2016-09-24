var Client = require('../models').Client;
//新建一个LIST
exports.newClient = function (data) {
  return Client.create(data);
};

exports.getClients = function (advisor_id, selectFields) {
  return Client.find({advisor: advisor_id}, selectFields).lean().exec();
}

exports.getClient = function (client_id, selectFields) {
  return Client.findOne({_id: client_id}, selectFields).lean().exec();
}

exports.patch = function (client_id, patchField, patchData) {
  var update = {
    $set: {}
  }
  update.$set[patchField] = patchData
  return Client.findOneAndUpdate({_id: client_id}, update).exec();
}
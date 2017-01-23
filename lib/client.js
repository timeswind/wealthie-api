var Client = require('../models').Client;
//新建一个LIST
exports.newClient = function (data) {
  return Client.create(data);
};

exports.getClients = function (advisor_id, selectFields) {
  return Client.find({advisor: advisor_id}, selectFields).lean().exec();
}

exports.getClient = function (client_id, selectFields, options) {
  if (options && options.lean) {
    return Client.findOne({_id: client_id}, selectFields).lean().exec();
  } else {
    return Client.findOne({_id: client_id}, selectFields).exec();
  }
}

exports.getByEmail = function (advisor_id, email, selectFields, options) {
  if (options && options.lean) {
    return Client.findOne({advisor: advisor_id, email: email}, selectFields).lean().exec();
  } else {
    return Client.findOne({advisor: advisor_id, email: email}, selectFields).exec();;
  }
}

exports.getByUserAndAdvisor = function (user_id, advisor_id, selectFields, options) {
  if (options && options.lean) {
    return Client.findOne({advisor: advisor_id, user: user_id}, selectFields).lean().exec();
  } else {
    return Client.findOne({advisor: advisor_id, user: user_id}, selectFields).exec();;
  }
}

exports.patch = function (client_id, patchField, patchData) {
  var update = {
    $set: {}
  }
  update.$set[patchField] = patchData
  return Client.findOneAndUpdate({_id: client_id}, update).exec();
}

exports.updateClient = function (id, updatedClientData) {
  return Client.findOneAndUpdate({_id: id}, {$set: updatedClientData}, { new: true }).exec();
}

exports.deleteClient = function (id) {
  return Client.findOneAndRemove({_id: id}).exec()
}

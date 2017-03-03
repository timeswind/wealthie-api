var Sharelist = require('../models').Sharelist;
//新建一个LIST
exports.newSharelistClient = function (data) {
  return Sharelist.create(data);
};

exports.getSharelistClients = function (advisor_id, selectFields) {
  return Sharelist.find({advisor: advisor_id}, selectFields).lean().exec();
}

exports.getSharelistClient = function (sharelist_client_id, selectFields, options) {
  if (options && options.lean) {
    return Sharelist.findOne({_id: sharelist_client_id}, selectFields).lean().exec();
  } else {
    return Sharelist.findOne({_id: sharelist_client_id}, selectFields).exec();
  }
}

exports.getSharelistByEmail = function (advisor_id, email, selectFields, options) {
  if (options && options.lean) {
    return Sharelist.findOne({advisor: advisor_id, email: email}, selectFields).lean().exec();
  } else {
    return Sharelist.findOne({advisor: advisor_id, email: email}, selectFields).exec();;
  }
}

exports.patch = function (sharelist_client_id, patchField, patchData) {
  var update = {
    $set: {}
  }
  update.$set[patchField] = patchData
  return Sharelist.findOneAndUpdate({_id: sharelist_client_id}, update).exec();
}

exports.updateSharelistClient = function (id, updatedSharelistClientData) {
  return Sharelist.findOneAndUpdate({_id: id}, {$set: updatedSharelistClientData}, { new: true }).exec();
}

exports.deleteSharelistClient = function (id) {
  return Sharelist.findOneAndRemove({_id: id}).exec()
}

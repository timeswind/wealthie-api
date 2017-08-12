var Message = require('../models').Message;

exports.newMessage = function (data) {
  return Message.create(data);
};

exports.fetchHistory = function (userid, contactid) {
  return Message.find({$and: [{'from': userid, 'to': contactid}, {'from': contactid, 'to': userid}]}).lean().exec();
};

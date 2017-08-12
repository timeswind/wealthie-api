var Contactlist = require('../models').Contactlist;

exports.createContactlist = function (data) {
  return Contactlist.create(data);
};

exports.addToContactlist = function (newContactUserId, listId) {
  return Contactlist.findByIdAndUpdate(listId, {$addToSet: {contacts: newContactUserId}}).exec();
};

exports.getContactlist = function (userid) {
  return Contactlist.find({'user': userid}).lean();
};

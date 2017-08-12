var Contactlist = require('../../models').Contactlist;
var Message = require('../../models').Message;

exports.getContactlist = function (user_id, callback) {
  Contactlist.findOne({user: user_id}).populate('contacts', 'firstName lastName').exec(function(err, contactlist){
    if (!err) {
      callback(null, contactlist)
    } else {
      callback(err)
    }
  })
}

exports.getMessageHistory = function (userid, contactid, callback) {
  console.log(userid, contactid)
  Message.find({$or: [{'from': userid, 'to': contactid}, {'from': contactid, 'to': userid}]}).sort({date: -1}).lean().exec(function(err, messages) {
    if (!err) {
      callback(null, messages)
    } else {
      callback(err)
    }
  });
}

exports.addToContactlist = function (user_id, contactid) {
  var contactlist = Contactlist.findOne({user: user_id}, function(err, contactlist) {
    if (!contactlist) {
      Contactlist.create({'user': user_id}, function(err, newContactlist){
        Contactlist.findByIdAndUpdate(newContactlist.id, {$addToSet: {contacts: contactid}}).exec();
      });
    } else {
      Contactlist.findByIdAndUpdate(contactlist.id, {$addToSet: {contacts: contactid}}).exec();
    }
  });
}

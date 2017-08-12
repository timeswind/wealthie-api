var Models = require('../../../lib/core');
var _ = require('lodash');
var $Contactlist = Models.$Contactlist;

exports.get = function* () {
  let user_role = this.state.user.role
  let user_id = this.state.user.id

  var contactlist = yield $Contactlist.getContactlist(user_id);
  if (contactlist) {
    this.status = 200
    this.body = {
      success: true,
      contactlist: contactlist
    }
  } else {
    var newContactlist = yield $Contactlist.createContactlist({'user': user_id});
    this.status = 200
    this.body = {
      success: true,
      contactlist: contactlist
    }
  }
}

exports.post = function* () {
  var newContactData = this.request.body
  let user_role = this.state.user.role
  let user_id = this.state.user.id

  var contactlist = yield $Contactlist.getContactlist(user_id);
  if (!contactlist) {
    // create new contact list
    contactlist = yield $Contactlist.createContactlist({'user': user_id});
  }

  var addNewContactToList = yield $Contactlist.addToContactlist(contactlist.id, newContactData.userid);
  this.status = 200
  this.body = {
    success: true,
    contactlist: addNewContactToList
  }
}

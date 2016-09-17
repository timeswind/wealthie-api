var User = require('./user');
var List = require('./list');
var Client = require('./client')
module.exports = {
  get $User () {
    return User;
  },

  get $List () {
    return List;
  },

  get $Client () {
    return Client;
  }
};

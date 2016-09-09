var User = require('./user');
var List = require('./list');

module.exports = {
  get $User () {
    return User;
  },

  get $List () {
    return List;
  }
};

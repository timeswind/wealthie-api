var User = require('../models').User;
var bcrypt = require('bcrypt-nodejs');

//新建一个用户
exports.addUser = function (data) {
  console.log(data)
  return User.create(data);
};

//通过id获取用户
exports.getById = function (id) {
  return User.findbyId(id).exec();
};

//通过name获取用户
exports.getUserByEmail = function (email) {
  return User.findOne({email: email}).exec();
};

exports.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

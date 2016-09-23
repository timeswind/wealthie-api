var Emailverify = require('../models').Emailverify;

exports.addOne = function (data) {
  return Emailverify.create(data);
};

exports.findOne = function (user, email) {
  return Emailverify.findOne({user: user, email: email});
};

exports.findOneByToken = function (token) {
  return Emailverify.findOne({token: token});
};

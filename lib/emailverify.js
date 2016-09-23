var Emailverify = require('../models').Emailverify;

exports.addOne = function (data) {
  return Emailverify.create(data);
};

exports.findOneByToken = function (token) {
  return Emailverify.findOne({token: token});
};

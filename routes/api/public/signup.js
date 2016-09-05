var Models = require('../../../lib/core');
var $User = Models.$User;
var jwt = require('koa-jwt');
var fs = require('fs');
var privateKey = fs.readFileSync('platform.rsa');

exports.post = function* () {
  var data = this.request.body;
  data.password = $User.generateHash(data.password)

  var userExist = yield $User.getUserByEmail(data.email);
  if (userExist) {
    this.status = 400;
    this.body = {error: 'Email exist!'};
    return false;
  }

  yield $User.addUser(data);

  var payload = {
    name: data.name,
    email: data.email
  };

  var token = jwt.sign(payload, privateKey, {algorithm: 'RS256'});

  this.body = {token: token};
};

var Models = require('../../lib/core');
var $User = Models.$User;
var jwt = require('koa-jwt');
var fs = require('fs');
var privateKey = fs.readFileSync('platform.rsa');

exports.post = function* () {
  var data = this.request.body;

  var userInfo = yield $User.getUserByEmail(data.email);
  if (!userInfo || !userInfo.validPassword(data.password)) {
    this.status = 401;
    this.body = {error: 'Email or password wrong!'};
    return false
  }

  var payload = {
    name: userInfo.name,
    email: userInfo.email
  };

  var token = jwt.sign(payload, privateKey, {algorithm: 'RS256'});
  this.status = 200;
  this.body = {token: token};
};

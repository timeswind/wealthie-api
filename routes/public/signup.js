var Models = require('../../lib/core');
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

  var newUser = yield $User.addUser(data);

  let payload = {
    name: data.firstName + " " + data.lastName,
    id: newUser.id,
    email: data.email,
    role: newUser.role,
  };

  let token = jwt.sign(payload, privateKey, {algorithm: 'RS256', expiresIn: '7d'});

  this.body = {
    success: true,
    name: payload.name,
    id: payload.id,
    email: payload.email,
    role: payload.role,
    token: token
  };
};

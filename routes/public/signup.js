const Models = require('../../lib/core')
const $User = Models.$User
const jwt = require('koa-jwt')
const fs = require('fs')
const privateKey = fs.readFileSync('platform.rsa')
const crypto = require('crypto')

exports.post = function* () {
  var data = this.request.body;
  if ('registered' in data && data.registered === false) {
    const randomToken = crypto.randomBytes(64).toString('hex')
    data.password = $User.generateHash(randomToken)
  } else {
    data.password = $User.generateHash(data.password)
    data.name = data.firstName + " " + data.lastName
  }


  var userExist = yield $User.getUserByEmail(data.email);
  if (userExist) {
    this.status = 400;
    this.body = {
      error: 'EMAIL_EXIST'
    };
    return false;
  }

  var newUser = yield $User.addUser(data);

  let payload = {
    name: data.name,
    id: newUser.id,
    email: data.email,
    role: newUser.role
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

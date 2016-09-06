var validator = require('validator');
var crypto = require('crypto');

module.exports = {
  "POST /public/signup": {
    "request": {
      "body": checkSignupBody
    }
  },
  "POST /public/login": {
    "request": {
      "body": checkSigninBody
    }
  }
};

function md5 (str) {
  return crypto.createHash('md5').update(str).digest('hex');
}

function checkSignupBody() {
  var body = this.request.body;
  var respond;
  if (!body || !body.firstName) {
    respond = {error: 'Please fill first name field'};
  }
  else if (!body.lastName) {
    respond = {error: 'Please fill last name field'};
  }
  else if  (!body.email || !validator.isEmail(body.email)) {
    respond = {error: 'Please fill correct email address'};
  }
  else if (!body.password) {
    respond = {error: 'Please enter password'};
  }
  else if (body.password !== body.repassword) {
    respond = {error: 'Two passwords do not match'};
  }
  if (respond) {
    this.status = 400;
    this.body = respond;
    return false;
  }
  body.email = validator.trim(body.email);
  body.password = validator.trim(body.password);
  delete body.repassword
  return true;
}

function checkSigninBody() {
  var body = this.request.body;
  var respond;
  if (!body || !body.email) {
    respond = {error: 'Please enter the email!'};
  }
  else if (!body.password) {
    respond = {error: 'Please enter the password!'};
  }
  if (respond) {
    this.status = 400;
    this.body = respond;
    return false;
  }
  body.email = validator.trim(body.email);
  body.password = validator.trim(body.password);
  return true;
}

var validator = require('validator');
var _ = require('lodash');
var ObjectId = require('mongoose').Types.ObjectId;

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
  },
  "GET /public/list": {
    "request": {
      "query": checkValidObjectId
    }
  },
  "POST /protect/list": {
    "request": {
      "body": checkCreateListBody
    }
  },
  "PUT /protect/list": {
    "request": {
      "body": checkEditListBody
    }
  }
};

function checkValidObjectId() {
  if (_.has(this.request.query, 'id')) {
    var list_id = this.request.query.id
    if (ObjectId.isValid(list_id)) {
      return true
    } else {
      return this.throw(400, 'Invalid ObjectId')
    }
  } else {
    return this.throw(400, 'Missing query id')
  }
}

function checkEditListBody() {
  var body = this.request.body;
  let requiredParams = ['_id', 'categories', 'phone', 'brief', 'email', 'experience', 'affiliation', 'address', 'loc', 'room', 'independent']
  var paramsComplete = _.every(requiredParams, _.partial(_.has, body));

  if (paramsComplete) {
    console.log(this.request.body)
    this.request.body = _.pick(body, requiredParams)
    if (!_.inRange(body.categories.length, 1, 4)) {
      return this.throw(400, 'You should choose at least 1 category but no more then 3')
    } else {
      return true
    }
  }
}

function checkCreateListBody() {
  var body = this.request.body;
  let requiredParams = ['categories', 'phone', 'brief']
  var paramsComplete = _.every(requiredParams, _.partial(_.has, body));
  // console.log(body)

  if (paramsComplete) {
    let user = this.state.user;
    let categories = body.categories;
    let phone = body.phone;
    let brief = body.brief;
    // console.log(user)
    if (!_.inRange(body.categories.length, 1, 4)) {
      return this.throw(400, 'You should choose at least 1 category but no more then 3')
    }
    else if (validator.isNull(phone)) {
      return this.throw(400, 'Missing phone number')
    }
    else if (validator.isNull(brief)) {
      return this.throw(400, 'Missing brief')
    }
    else {
      return true
    }
  } else {
    return this.throw(400, 'invalid params')
  }

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
  else if (body.isManager) {
    if (body.isIndependent === false) {
      if (!body.affiliation || validator.trim(body.affiliation) === "") {
        respond = {error: 'You need to fill the affiliation field'};
      } else {
        body.role = 2 // 1 for client
      }
    } else if (body.isIndependent === true) {
      body.role = 3 // 1 for client
      if (body.affiliation) {
        delete body.affiliation
      }
    }
  } else {
    body.role = 1 // 1 for client
    delete body.affiliation
    delete body.isIndependent
    delete body.isManager
  }
  if (respond) {
    this.status = 400;
    this.body = respond;
    return false;
  }
  body.email = validator.trim(body.email).toLowerCase();
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

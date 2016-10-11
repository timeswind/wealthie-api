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
  "POST /protect/client": {
    "request": {
      "body": checkCreateClientBody
    }
  },
  "PUT /protect/list": {
    "request": {
      "body": checkEditListBody
    }
  },
  "POST /protect/appointment": {
    "request": {
      "body": checkAddAppointmentbody
    }
  },
  "GET /protect/calendar": {
    "request": {
      "query": checkGetCalendarQuery
    }
  },
  "GET /public/calendar": {
    "request": {
      "query": checkGetCalendarQueryForPublicApi
    }
  },
  "POST /protect/calendar": {
    "request": {
      "body": checkAddOfficeTimeBody
    }
  },
  "DELETE /protect/calendar": {
    "request": {
      "query": checkDeleteOfficeTimeBody
    }
  }
};

function checkGetCalendarQueryForPublicApi() {
  let requiredParams = ['year', 'month', 'advisor_id'];
  var paramsComplete = _.every(requiredParams, _.partial(_.has, this.request.query));
  var query = this.request.query

  if (paramsComplete && _.isNumber(parseInt(query.year)) && parseInt(query.year).toString().length === 4 && _.isNumber(parseInt(query.month)) && _.inRange(parseInt(query.month).toString().length, 1, 3) &&ObjectId.isValid(this.request.query.advisor_id)) {
    return true
  } else {
    return this.throw(400, 'invalid params')
  }
}

function checkGetCalendarQuery() {
  var query = this.request.query
  if (_.has(query, 'year') && _.has(query, 'month')) {
    if (_.isNumber(parseInt(query.year)) && parseInt(query.year).toString().length === 4 && _.isNumber(parseInt(query.month)) && _.inRange(parseInt(query.month).toString().length, 1, 3)) {
      return true
    } else {
      return this.throw(400, 'invalid params')
    }
  } else if (!(_.has(query, 'year') || _.has(query, 'month'))) {
    return true
  }
}

function checkDeleteOfficeTimeBody() {
  let requiredParams = ['type', 'calendar_id', 'event_id'];
  var paramsComplete = _.every(requiredParams, _.partial(_.has, this.request.query));
  if (paramsComplete && _.isString(this.request.query.type) && ObjectId.isValid(this.request.query.calendar_id) && ObjectId.isValid(this.request.query.event_id)) {
    return true
  } else {
    return this.throw(400, 'invalid params')
  }
}

function checkAddOfficeTimeBody() {
  let requiredParams = ['day', 'from', 'to'];
  var paramsComplete = _.every(requiredParams, _.partial(_.has, this.request.body));
  var body = this.request.body
  if (paramsComplete) {
    if (body.year && body.month) {
      this.request.body = _.pick(this.request.body, ['day', 'from', 'to', 'year', 'month'])
      let day = body.day
      let from = body.from
      let to = body.to
      let year = body.year
      let month = body.month
      let monthcodeValid = _.isNumber(parseInt(body.year)) && parseInt(body.year).toString().length === 4 && _.isNumber(parseInt(body.month)) && _.inRange(parseInt(body.month).toString().length, 1, 3)
      if (_.inRange(day, 1, 8) && _.inRange(from, 0, 1441) && _.inRange(to, 0, 1441) && from < to && monthcodeValid) {
        return true
      } else {
        return this.throw(400, 'invalid params')
      }
    } else {
      this.request.body = _.pick(this.request.body, requiredParams)
      let day = this.request.body.day
      let from = this.request.body.from
      let to = this.request.body.to

      if (_.inRange(day, 1, 8) && _.inRange(from, 0, 1441) && _.inRange(to, 0, 1441) && from < to) {
        return true
      } else {
        return this.throw(400, 'invalid params')
      }
    }

  } else {
    return this.throw(400, 'invalid params')
  }
}

function checkAddAppointmentbody () {
  let requiredParams = ['client', 'date', 'start', 'end'];
  var paramsComplete = _.every(requiredParams, _.partial(_.has, this.request.body));

  if (paramsComplete) {
    this.request.body = _.pick(this.request.body, ['client', 'date', 'start', 'end', 'note'])
    return true
  } else {
    return this.throw(400, 'invalid params')
  }
}

function checkCreateClientBody () {
  let requiredParams = ['name']
  var paramsComplete = _.every(requiredParams, _.partial(_.has, this.request.body));

  if (paramsComplete) {
    this.request.body = _.pick(this.request.body, ['name', 'phone', 'email'])
    return true
  } else {
    return this.throw(400, 'invalid params')
  }
}

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
  let requiredParams = ['_id', 'categories', 'phone', 'brief', 'email', 'experience', 'address', 'loc', 'room', 'independent']
  var paramsComplete = _.every(requiredParams, _.partial(_.has, body));

  if (paramsComplete) {
    console.log(this.request.body)
    this.request.body = _.pick(body, requiredParams)
    if (!_.inRange(body.categories.length, 1, 4)) {
      return this.throw(400, 'You should choose at least 1 category but no more then 3')
    } else {
      return true
    }
  } else {
    return this.throw(400, 'invalid params')
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

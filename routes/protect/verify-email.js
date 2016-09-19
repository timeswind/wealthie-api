var Models = require('../../lib/core');
var _ = require('lodash');
var $User = Models.$User;
var helper = require('sendgrid').mail
var sg = require("sendgrid")("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");

exports.get = function* () {
  var user_id = this.state.user.id
  var userInfo = yield $User.getById(user_id);

  if (userInfo) {
    if (userInfo.verify === true) {
      this.throw(400, 'Email already varified')
    } else {
      var from_email = new helper.Email("wealthie@wealthie.co")
      var to_email = new helper.Email(userInfo.email)
      var subject = "Sending with SendGrid is Fun"
      var content = new helper.Content("text/plain", "and easy to do anywhere, even with Node.js")
      var mail = new helper.Mail(from_email, subject, to_email, content)

      var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
      });

      sg.API(request, function(error, response) {
        console.log(error)
        console.log(response.statusCode)
        console.log(response.body)
        console.log(response.headers)
      })
    }
  } else {
    this.throw(500, 'User account do not exist')
  }

};

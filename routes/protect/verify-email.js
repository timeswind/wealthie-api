var Models = require('../../lib/core');
var crypto = require('crypto');
var _ = require('lodash');
var $User = Models.$User;
var $Emailverify = Models.$Emailverify;
var helper = require('sendgrid').mail
var sg = require("sendgrid")("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");

exports.get = function* () {
  var user_id = this.state.user.id
  var userInfo = yield $User.getById(user_id)

  if (userInfo) {
    if (userInfo.verify === true) {
      this.throw(400, 'Email already verified')
    } else {
      var token = crypto.randomBytes(32).toString('hex');
      var data = {
        user: userInfo.id,
        email: userInfo.email,
        token: token
      }
      console.log(token)
      console.log(userInfo.email)

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

      var sendEmailRequest = yield sg.API(request)

      var Emailverify = yield $Emailverify.addOne(data)

      if (Emailverify && sendEmailRequest) {
        this.status = 200
        this.body = {
          success: true,
          Emailverify: Emailverify
        }
      } else {
        this.throw(500, 'Failed')
      }
    }
  } else {
    this.throw(500, 'User account do not exist')
  }
};

exports.post = function* () {
  var token = this.request.body.token
  var email = this.request.body.email
  var emailverify = yield $Emailverify.findOneByToken(token)
  var userInfo = yield $User.getUserByEmail(email)

  if (emailverify && userInfo) {
    if (emailverify.email === email && emailverify.token === token) {
      yield emailverify.remove()
      userInfo.verify = true
      yield userInfo.save()
      this.status = 200
      this.body = {
        success: true,
        verify: true
      }
    } else {
      this.throw(404, 'Failed to verify email');
    }
  } else {
    this.throw(404, 'Failed to verify email');
  }
}

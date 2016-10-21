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
      this.status = 400;
      this.body = {
        success: false,
        error: "Email already verified"
      };
    } else {
      var token = crypto.randomBytes(32).toString('hex');
      var data = {
        user: userInfo.id,
        email: userInfo.email,
        token: token
      }
      console.log(token)
      console.log(userInfo.email)

      url = "https://wealthie.co/verify-email/" + token

      var emailContent = "<p>Click or copy the following link to browser to verify your email</p><a href=\'" + url + "\'>" + url + "</a>"

      var from_email = new helper.Email("wealthie@wealthie.co")
      var to_email = new helper.Email(userInfo.email)
      var subject = "Verify your email on Wealthie.co"
      var content = new helper.Content("text/html", emailContent)
      var mail = new helper.Mail(from_email, subject, to_email, content)

      var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
      });


      var Emailverify = yield $Emailverify.findOne(userInfo.id, userInfo.email)
      console.log(Emailverify)
      if (!Emailverify) {
        Emailverify = yield $Emailverify.addOne(data)
        var sendEmailRequest = yield sg.API(request)
        if (Emailverify && sendEmailRequest) {
          this.status = 200
          this.body = {
            success: true
          }
        } else {
          this.status = 500;
          this.body = {
            success: false,
            error: "Failed"
          };
        }
      } else {
        Emailverify.token = token;
        var updatedEmailverify = yield Emailverify.save();
        var sendEmailRequest = yield sg.API(request)
        if (updatedEmailverify && sendEmailRequest) {
          this.status = 200
          this.body = {
            success: true
          }
        } else {
          this.status = 500;
          this.body = {
            success: false,
            error: "Failed"
          };
        }
      }
    }
  } else {
    this.status = 500;
    this.body = {
      success: false,
      error: "User account do not exist"
    };
  }
};

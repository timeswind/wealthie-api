// var helper = require('sendgrid').mail
// var sg = require("sendgrid")("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");
//
// module.exports.sendVerifyEmail = function (to_email, token) {
//   var emailContent = "<p>Click or copy the following link to browser to verify your email</p><a>" + token + "</a>"
//   var from_email = new helper.Email("wealthie@wealthie.co")
//   var to_email = new helper.Email(userInfo.email)
//   var subject = "Sending with SendGrid is Fun"
//   var content = new helper.Content("text/html", emailContent)
//   var mail = new helper.Mail(from_email, subject, to_email, content)
//
//   var request = sg.emptyRequest({
//     method: 'POST',
//     path: '/v3/mail/send',
//     body: mail.toJSON()
//   });
//
//   var sendEmailRequest = yield sg.API(request)
//
//   var Emailverify = yield $Emailverify.addOne(data)
//
//   if (Emailverify && sendEmailRequest) {
//     this.status = 200
//     this.body = {
//       success: true,
//       Emailverify: Emailverify
//     }
//   } else {
//     this.throw(500, 'Failed')
//   }
// }

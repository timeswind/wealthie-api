var Models = require('../../lib/core');
var crypto = require('crypto');
var $User = Models.$User;
var $Emailverify = Models.$Emailverify;

exports.post = function* () {
  var token = this.request.body.token
  var emailverify = yield $Emailverify.findOneByToken(token)
  console.log(token)
  console.log(emailverify)
  if (emailverify && emailverify.token === token) {
    var email = emailverify.email
    var userInfo = yield $User.getUserByEmail(email)
    if (userInfo) {
      yield emailverify.remove()
      userInfo.verify = true
      yield userInfo.save()
      this.status = 200
      this.body = {
        success: true,
        verify: true
      }
    } else {
      this.status = 400
      this.body = {
        success: false,
        error: 'Failed to verify email'
      }
    }
  } else {
    this.status = 400
    this.body = {
      success: false,
      error: 'Failed to verify email'
    }
  }
}

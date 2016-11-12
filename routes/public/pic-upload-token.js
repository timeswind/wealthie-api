var crypto = require('crypto');
const AccessKeyId = require('../../config/Private-settings').ALIYUN_OSS_ACCESS_KEY;
const AccessKeySecret = require('../../config/Private-settings').ALIYUN_OSS_ACCESS_SECRET;
exports.get = function* () {
  var now = new Date()
  var expires = new Date(now.getTime() + 15 * 60000)
  var policyText = {
    "expiration": expires, //15min to expire
    "conditions": [
      {"bucket": "wealthie" }
    ]
  }
  var policy = new Buffer(JSON.stringify(policyText)).toString('base64')
  const hmac = crypto.createHmac('sha1', AccessKeySecret);
  const signature = hmac.update(policy).digest('base64')
  if (signature) {
    this.status = 200
    this.body = {
      success: true,
      policy,
      expires,
      signature,
      AccessKeyId
    }
  } else {
    this.status = 200
    this.body = {
      success: false
    }
  }
}

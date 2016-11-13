var crypto = require('crypto');
const AccessKeyId = require('../../../config/Private-settings').ALIYUN_OSS_ACCESS_KEY;
const AccessKeySecret = require('../../../config/Private-settings').ALIYUN_OSS_ACCESS_SECRET;
exports.get = function* () {
  var list_id = this.request.query.id
  if (list_id) {
    var now = new Date()
    var expires = new Date(now.getTime() + 15 * 60000)
    var key = crypto.createHash('md5').update('list-avatar-' + list_id).digest("hex");
    var policyText = {
      "expiration": expires, //15min to expire
      "conditions": [
        {"bucket": "wealthie"},
        ['eq', '$key', key]
      ]
    }
    var policy = new Buffer(JSON.stringify(policyText)).toString('base64')
    const hmac = crypto.createHmac('sha1', AccessKeySecret);
    const signature = hmac.update(policy).digest('base64')
    if (signature) {
      this.status = 200
      this.body = {
        success: true,
        key,
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
  } else {
    this.status = 400
    this.body = {
      success: false,
      error: 'no list id provide'
    }
  }
}

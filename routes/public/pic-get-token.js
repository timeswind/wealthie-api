var crypto = require('crypto');
exports.get = function* () {
  this.status = 200;
  this.body = {
    success: false,
    signature: null
  }
  // var policyText = {
  //   "Statement": [
  //     {
  //       "Action": "oss:*",
  //       "Effect": "Allow",
  //       "Resource": "*"
  //     }
  //   ],
  //   "Version": "1"
  // }
  // var CanonicalizedResource = '/wealthie/'
  // var policyBase64 = new Buffer(JSON.stringify(policyText)).toString('base64')
  // message = policyBase64
  // var nowDate = new Date()
  // var expires = Math.floor(new Date(nowDate.getTime() + 15 * 60000) / 1000)
  // const hmac = crypto.createHmac('sha1', 'qZjEH17TrQuLMMzXQ1EXi9o6PllR2H');
  // var payload = "GET" + "\n"
  // + "\n"
  // + "\n"
  // + expires + "\n"
  // + CanonicalizedResource
  // console.log(payload)
  // hmac.update(payload);
  // const signature = hmac.digest('base64')
  // if (signature) {
  //   this.status = 200
  //   this.body = {
  //     success: true,
  //     expires: expires,
  //     AccessKeyId: 'LTAIcmwe3AB9j4ho',
  //     signature
  //   }
  // } else {
  //   this.status = 200
  //   this.body = {
  //     success: false,
  //     signature: null
  //   }
  // }
}

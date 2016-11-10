var OSS = require('ali-oss');
var STS = OSS.STS;

var sts = new STS({
  accessKeyId: 'LTAIg8v4y524w6l9',
  accessKeySecret: '7oq3mOaIID0lYMKytXMWiPkagQUw7Y'
});

exports.get = function* () {
  var token = yield sts.assumeRole('acs:ram::1124972045959065:role/ramtestreadonly', null,  15 * 60, 'image-upload');
  if (token && token.credentials) {
    this.status = 200
    this.body = {
      success: true,
      credentials: token.credentials
    }
  } else {
    this.status = 200
    this.body = {
      success: false,
      credentials: null
    }
  }
}

var qiniu = require('qiniu');

var privateSettings = require("../../config/Private-settings");
//七牛key
qiniu.conf.ACCESS_KEY = privateSettings.QINIU_ACCESS_KEY;
qiniu.conf.SECRET_KEY =  privateSettings.QINIU_SECRET_KEY;

exports.get = function* () {
  var myUpToken = new qiniu.rs.PutPolicy(privateSettings.QINIU_PIC_POLICY);
  var token = yield myUpToken.token();
  this.set("Cache-Control", "max-age=0, private, must-revalidate");
  this.set("Pragma", "no-cache");
  this.set("Expires", 0);
  if (token) {
    this.status = 200
    this.body = {
      success: true,
      uptoken: token
    }
  } else {
    this.status = 500
    this.body = {
      success: false,
      uptoken: null
    }
  }
};

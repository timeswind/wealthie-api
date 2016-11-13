var Models = require('../../../lib/core');
var $List = Models.$List;

exports.post = function* () {
  let id = this.request.body.id
  let key = this.request.body.key
  var profileImage = {
    key,
    service: 'aliyunOSS'
  }
  var listInfo = yield $List.modifyByIf(id)
  if (listInfo) {
    listInfo.profileImage = profileImage
    var saved = yield listInfo.save()
    if (saved) {
      this.status = 200
      this.body = {
        success: true
      }
    } else {
      this.status = 500
      this.body = {
        success: false
      }
    }
  }
}

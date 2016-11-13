var Models = require('../../../lib/core');
var $List = Models.$List;

exports.post = function* () {
  let id = this.request.body.id
  var listInfo = yield $List.modifyByIf(id)
  if (listInfo) {
    this.status = 200
  }
}

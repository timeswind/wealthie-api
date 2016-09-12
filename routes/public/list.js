var Models = require('../../lib/core');
var $List = Models.$List;
var $User = Models.$User;

exports.get = function* () {
  var list_id = this.request.query.id

  var listInfo = yield $List.getById(list_id, "independent affiliation categories brief phone email experience address loc advisor")
  if (listInfo) {
    let advisor_id = listInfo.advisor
    console.log(listInfo)
    var advisorInfo = yield $User.getById(advisor_id, "firstName lastName")
    console.log(advisorInfo)
    if (advisorInfo) {
      this.status = 200;
      this.body = {
        success: true,
        listInfo: listInfo,
        advisorInfo: advisorInfo
      };
      return true
    } else {
      this.throw(404, 'advisorInfo do not exist')
    }

  } else {
    this.throw(404, 'listInfo do not exist')
  }

};

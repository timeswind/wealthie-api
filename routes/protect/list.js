var Models = require('../../lib/core');
var $List = Models.$List;
var $User = Models.$User;

exports.post = function* () {
  var data = this.request.body
  let user = this.state.user
  // console.log(data)
  // console.log(user)
  data.advisor = user.id

  var userInfo = yield $User.getById(user.id)

  if (userInfo) {
    if (userInfo.role === 2) {
      data.independent = false
      data.affiliation = userInfo.affiliation
    } else if (userInfo.role === 3) {
      data.independent = true
    }
  } else {
    this.throw(500, 'User account do not exist')
  }

  var queryUserList = yield $List.checkUserListExist(user.id)
  // console.log(queryUserList)
  if (queryUserList === null) {
    var newListInfo = yield $List.createList(data);
    if (newListInfo) {
      this.status = 200;
      this.body = {
        success: true
      };
      return true
    } else {
      return this.throw(500, 'Something went wrong')
    }
  } else {
    return this.throw(400, 'You have already listed')
  }
};

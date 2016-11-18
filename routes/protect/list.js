var Models = require('../../lib/core');
var _ = require('lodash');
var $List = Models.$List;
var $User = Models.$User;

exports.post = function* () {
  var data = this.request.body
  let user = this.state.user

  data['advisor'] = user.id
  data['name'] = user.name || ""
  var userInfo = yield $User.getById(user.id)

  if (userInfo) {
    if (userInfo.role === 2) {
      data.independent = false
      data.affiliation = userInfo.affiliation
    } else if (userInfo.role === 3) {
      data.independent = true
    }
  } else {
    this.status = 500;
    this.body = {
      success: false,
      error: "User account don't exist"
    };
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
      this.status = 500;
      this.body = {
        success: false,
        error: "Something went wrong"
      };
    }
  } else {
    this.status = 400;
    this.body = {
      success: false,
      error: "You have already listed"
    };
  }
};

exports.put = function* () {
  let user_id = this.state.user.id
  var updates = this.request.body
  updates.experience = _.filter(updates.experience, function(experience) {
    return (experience !== null && _.has(experience, 'title') && _.has(experience, 'text'))
  });

  let list_id = updates._id


  delete updates._id
  var findListAndUpdate = yield $List.update(list_id, user_id, updates)
  if (findListAndUpdate) {
    this.status = 200;
    this.body = {
      success: true,
      listInfo: findListAndUpdate
    };
  } else {
    this.status = 500;
    this.body = {
      success: false,
      error: "Fail to update"
    };
  }
}

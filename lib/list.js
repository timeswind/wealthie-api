var List = require('../models').List;

//新建一个用户
exports.createList = function (data) {
  return List.create(data);
};

//新建一个用户
exports.checkUserListExist = function (user_id) {
  return List.findOne({advisor: user_id}).lean().exec()
};

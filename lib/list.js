var List = require('../models').List;

//新建一个用户
exports.createList = function (data) {
  return List.create(data);
};

//新建一个用户
exports.getByUserId = function (user_id, selectFields) {
  if (arguments.length === 1) {
    return List.findOne({advisor: user_id}).lean().exec()
  } else {
    return List.findOne({advisor: user_id}, selectFields).lean().exec()
  }
};

exports.update = function (list_id, user_id, updates) {
  return List.findOneAndUpdate({ "_id": list_id, advisor: user_id }, { "$set": updates }).exec()
}

//新建一个用户
exports.checkUserListExist = function (user_id) {
  return List.findOne({advisor: user_id}).lean().exec()
};

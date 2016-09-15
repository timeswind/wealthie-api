var List = require('../models').List;
var _  = require('lodash');
//新建一个LIST
exports.createList = function (data) {
  return List.create(data);
};

exports.getById = function (list_id, selectFields) {
  if (arguments.length === 1) {
    return List.findOne({ '_id': list_id }).lean().exec()
  } else {
    return List.findOne({ '_id': list_id }, selectFields).lean().exec()
  }
};

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

exports.checkUserListExist = function (user_id) {
  return List.findOne({advisor: user_id}).lean().exec()
};

exports.combineSearch = function (categories, coordinate, selectFields) {
  var query = {
    loc: {
      $nearSphere: {
        $geometry: {
          type: 'Point',
          coordinates: coordinate
        },
        $maxDistance: 20000 // 20 km
      }
    }
  }
  if (categories) {
    query['categories'] = {
      '$in': categories
    }
  }
  return (
    List
    .find(query, selectFields)
    .populate('advisor', 'firstName lastName')
    .lean()
    .exec()
  )
};

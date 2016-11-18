var List = require('../models').List;
var _ = require('lodash');
//新建一个LIST
exports.createList = function (data) {
  return List.create(data);
};

exports.getAll = function (selectFields) {
  return List.find({}, selectFields).populate('advisor', 'firstName lastName').lean().exec()
};

exports.getAllUnclaimed = function (selectFields) {
  return List.find({public: true}, selectFields).sort({_id: -1}).populate('listBy', 'firstName').lean().exec()
};

exports.findOneUnclaimed = function (list_id) {
  return List.findOne({_id: list_id, public: true}).exec()
};

exports.getLatest = function (limit, selectFields) {
  if (arguments.length === 1) {
    return List.find({}).sort({_id: -1}).limit(limit).lean().exec()
  } else {
    return List.find({}, selectFields).sort({_id: -1}).limit(limit).lean().exec()
  }
};

exports.getById = function (list_id, selectFields) {
  if (arguments.length === 1) {
    return List.findOne({'_id': list_id}).lean().exec()
  } else {
    return List.findOne({'_id': list_id}, selectFields).lean().exec()
  }
};

exports.modifyByIf = function (list_id) {
  return List.findOne({'_id': list_id}).exec()
};

exports.getByAdvisorId = function (advisor_id, selectFields) {
  if (arguments.length === 1) {
    return List.findOne({'advisor': advisor_id}).lean().exec()
  } else {
    return List.findOne({'advisor': advisor_id}, selectFields).lean().exec()
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
  return List.findOneAndUpdate({"_id": list_id, advisor: user_id}, {"$set": updates}, {new: true}).exec()
}

exports.updateUnclaimed = function (list_id, updates) {
  return List.findOneAndUpdate({"_id": list_id}, {"$set": updates}).exec()
}

exports.checkUserListExist = function (user_id) {
  return List.findOne({advisor: user_id}).lean().exec()
};

exports.combineSearch = function (categories, coordinate, selectFields, options) {
  var query = {
    "addresses.loc": {
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

  if (options && options.count) {
    return (
        List
            .count(query)
            .exec()
    )
  } else if (options && options.page && options.listPerPage) {
    return (
        List
            .find(query, selectFields)
            .limit(options.listPerPage)
            .skip(options.listPerPage * (options.page - 1))
            .lean()
            .exec()
    )
  } else {
    return null
  }

};

var FeedbackTemplate = require('../models').FeedbackTemplate;

exports.addOne = function (data) {
  return FeedbackTemplate.create(data);
};

exports.getTemplates = function (advisor_id, selectFields) {
  return FeedbackTemplate.find({advisor: advisor_id}, selectFields).lean().exec();
};

exports.findOneById = function (id, options) {
  if (options && options.lean) {
    return FeedbackTemplate.findOne({_id: id}).lean().exec();
  } else {
    return FeedbackTemplate.findOne({_id: id});
  }
};

var FeedbackTemplate = require('../models').FeedbackTemplate;

exports.addOne = function (data) {
  return FeedbackTemplate.create(data);
};

exports.getTemplates = function (advisor_id, selectFields) {
  return FeedbackTemplate.find({advisor: advisor_id}, selectFields).lean().exec();
};

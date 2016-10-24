var Feedback = require('../models').Feedback;

exports.addOne = function (data) {
  return Feedback.create(data);
};

exports.getByTemplateId = function (template_id, advisor_id, options) {
  if (options && options.lean) {
    return Feedback.find({template: template_id, advisor: advisor_id}).lean().exec();
  } else {
    return Feedback.find({template: template_id, advisor: advisor_id});
  }
};

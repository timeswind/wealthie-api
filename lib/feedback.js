var Feedback = require('../models').Feedback;

exports.addOne = function (data) {
  return Feedback.create(data);
};

var Models = require('../../../lib/core');
var $FeedbackTemplate = Models.$FeedbackTemplate;

exports.get = function* (id) {
  var feedback = yield $FeedbackTemplate.findOneById(id, { lean: true })
  if (feedback && feedback !== null) {
    this.status = 200
    this.body = {
      success: true,
      feedback: feedback
    }
  } else {
    this.status = 400
    this.body = {
      success: false,
      feedback: null
    }
  }
};

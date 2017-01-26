var Models = require('../../../lib/core');
var $FeedbackTemplate = Models.$FeedbackTemplate;
var $Feedback = Models.$Feedback;

exports.get = function* (template_id) {
  var advisor_id = this.state.user.id

  var feedbacks = yield $Feedback.getByTemplateId(template_id, advisor_id, { lean: true })

  if (feedbacks) {
    this.status = 200
    this.body = {
      success: true,
      feedbacks: feedbacks
    }
  } else {
    this.status = 500
    this.body = {
      success: false,
      feedbacks: null
    }
  }
};

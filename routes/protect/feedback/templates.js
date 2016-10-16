var Models = require('../../../lib/core');
var $FeedbackTemplate = Models.$FeedbackTemplate;

exports.get = function* () {
  var advisor_id = this.state.user.id

  var templates = yield $FeedbackTemplate.getTemplates(advisor_id, "title fields created_at")

  if (templates) {
    this.status = 200
    this.body = {
      success: true,
      templates: templates
    }
  } else {
    this.status = 500
    this.body = {
      success: false,
      templates: null
    }
  }
};

var Models = require('../../../lib/core');
var $FeedbackTemplate = Models.$FeedbackTemplate;

exports.post = function* () {
  var newFeedbackTemplateData = this.request.body
  var advisor_id = this.state.user.id
  newFeedbackTemplateData['advisor'] = advisor_id
  console.log(newFeedbackTemplateData)
  console.log(newFeedbackTemplateData['fields'])
  var newFeedbackTemplate = yield $FeedbackTemplate.addOne(newFeedbackTemplateData)

  if (newFeedbackTemplate) {
    this.status = 200
    this.body = {
      success: true,
      template: newFeedbackTemplate
    }
  } else {
    this.status = 500
    this.body = {
      success: false,
      template: null
    }
  }
};

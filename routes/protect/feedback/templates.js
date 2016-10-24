var Models = require('../../../lib/core');
var $FeedbackTemplate = Models.$FeedbackTemplate;
var _ = require('lodash');

exports.get = function* () {
  var advisor_id = this.state.user.id

  var templates = yield $FeedbackTemplate.getTemplates(advisor_id, "title fields statistic created_at")

  if (templates) {
    templates.forEach(function(template){
      if (template.statistic && template.statistic.length !== 0 && template.fields && template.fields.length !==0) {
        template.statistic.forEach(function(stat){
          // console.log(template.fields)
          let fid = stat.fid
          let datas = stat.datas
          let field_index = _.findIndex(template.fields, { '_id': fid })
          if (field_index >= 0) {
            template.fields[field_index]['datas'] = datas
          }
        })
      }
    })
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

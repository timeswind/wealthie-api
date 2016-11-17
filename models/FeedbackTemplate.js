var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var FeedbackTemplateQuestionSchema = new Schema({

  question: { type: String, require: true },
  type: { type: String, require: true },
  choices: { type: [String], require: false },
  rates: { type: [Number], require: false },
  labels: { type: [String], require: false }

});

var FeedbackStatisticSchema = new Schema({

  _id:false,
  fid: { type: ObjectId, require: true },
  datas: { type: String, require: true }

});

var FeedbackTemplateSchema = new Schema({
  advisor: { type: ObjectId, ref: "User", require: true },
  title: { type: String, require: true },
  description: { type: String, require: false },
  fields: [FeedbackTemplateQuestionSchema],
  statistic: [FeedbackStatisticSchema],
  updated_at: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now }
});

FeedbackTemplateSchema.index({
  advisor: 1,
  updated_at: 1
});

module.exports = mongoose.model('FeedbackTemplate', FeedbackTemplateSchema);

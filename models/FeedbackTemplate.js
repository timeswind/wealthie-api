var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var Mixed = Schema.Types.Mixed

var FeedbackTemplateQuestionSchema = new Schema({

  question: { type: String, require: true },
  type: { type: String, require: true },
  choices: { type: [String], require: false },
  rates: { type: [Number], require: false }

});

var FeedbackTemplateSchema = new Schema({
  advisor: { type: ObjectId, ref: "advisor", require: true },
  title: { type: String, require: true },
  fields: [FeedbackTemplateQuestionSchema],
  updated_at: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now }
});

FeedbackTemplateSchema.index({
  advisor: 1
});

module.exports = mongoose.model('FeedbackTemplate', FeedbackTemplateSchema);

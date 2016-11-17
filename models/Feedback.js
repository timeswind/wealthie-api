var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var FeedbackResponseSchema = new Schema({
  fid: { type: ObjectId, required: true },
  data: { type: String, requried: true }
})

var FeedbackSchema = new Schema({
  client: { type: ObjectId, ref: "Client", require: true },
  user: { type: ObjectId, ref: 'User' },
  advisor: { type: ObjectId, ref: "User", require: true },
  name: { type: String }, // if user didn't login, leave the name
  template: { type: ObjectId, ref: "FeedbackTemplate", require: true },
  responses: [FeedbackResponseSchema],
  complete: { type: Boolean, default: false },
  updated_at: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now }
});

FeedbackSchema.index({advisor: 1, template: 1})
FeedbackSchema.index({advisor: 1, client: 1})
FeedbackSchema.index({user: 1, advisor: 1})

module.exports = mongoose.model('Feedback', FeedbackSchema);

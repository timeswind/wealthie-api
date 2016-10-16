var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var Mixed = Schema.Types.Mixed

var FeedbackSchema = new Schema({
  client: { type: ObjectId, ref: "Client", require: true },
  user: { type: ObjectId, ref: 'User' },
  advisor: { type: ObjectId, ref: "User", require: true },
  template: { type: ObjectId, ref: "FeedbackTemplate", require: true },
  answers: [{
    field: ObjectId,
    data: [Mixed]
  }],
  complete: { type: Boolean, default: false },
  updated_at: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now }
});

FeedbackSchema.index({
  client: 1,
  user: 1,
  advisor: 1
});

module.exports = mongoose.model('Feedback', FeedbackSchema);

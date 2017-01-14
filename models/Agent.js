var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var AgentSchema = new Schema({
  company: { type: ObjectId, ref: 'Company' },
  manager: { type: ObjectId, ref: 'User', required: true },
  referBy: { type: ObjectId, ref: 'User' },
  user: { type: ObjectId, ref: 'User' },
  joinAt: { type: Date },
  meta: [{
    key: String,
    data: String
  }],
  isActive: { type: Boolean }
});


AgentSchema.index({ manager: 1, company: 1}); // for advisor search client email
AgentSchema.index({ referBy: 1, company: 1}); // for advisor search client categories

module.exports = mongoose.model('Agent', AgentSchema);

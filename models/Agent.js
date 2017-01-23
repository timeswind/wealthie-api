var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var AgentSchema = new Schema({
  manager: { type: ObjectId, ref: 'User', required: true },
  user: { type: ObjectId, ref: 'User' },
  name: { type: String, require: true },
  email: { type: String },
  phone: { type: String },
  referBy: { type: String },
  joinAt: { type: Date },
  isActive: { type: Boolean },
  note: { type: String },
  address: { type: String },
  fields: [{
    key: String,
    value: String,
    _id: false
  }]
});


AgentSchema.index({ manager: 1, isActive: 1 }); // for advisor search client email
AgentSchema.index({ email: 1 }); // for advisor search client email
// AgentSchema.index({ referBy: 1 }); // for advisor search client categories

module.exports = mongoose.model('Agent', AgentSchema);

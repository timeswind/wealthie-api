var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var MessageSchema = new Schema({
  from: { type: ObjectId, ref: 'User' },
  to: { type: ObjectId, ref: 'User' },
  body: { type: String },
  read: { type: Boolean },
  time: { type: Date }
});


MessageSchema.index({ from: 1, to: 1 });
MessageSchema.index({ to: 1, from: 1 });

module.exports = mongoose.model('Message', MessageSchema);

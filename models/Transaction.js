var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var TransactionSchema = new Schema({
  source: { type: ObjectId, ref: "User", required: true },
  destination: { type: ObjectId, ref: "User", required: true },
  value: { type: Number, required: true },
  state: { type: String, required: true },
  lastModified: { type: Date, required: true }
});

TransactionSchema.index({
  source: 1,
  destination: 1,
  state: 1
});

module.exports = mongoose.model('Transaction', TransactionSchema);

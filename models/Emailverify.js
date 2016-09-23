var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var EmailverifySchema = new Schema({
  user: { type: ObjectId, ref: "User", require: true },
  email: { type: String, require: true },
  token: { type: String, require: true },
  updated_at: { type: Date, default: Date.now }
});

EmailverifySchema.index({
  token: 1
});

module.exports = mongoose.model('Emailverify', EmailverifySchema);

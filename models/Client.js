var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var ClientSchema = new Schema({
  advisor: { type: ObjectId, ref: 'User', required: true },
  user: { type: ObjectId, ref: 'User' },
  email: { type: String },
  name: { type: String, required: true },
  note: { type: String },
  sex: { type: Number }, // 1 for male, 2 for female
  country: { type: String },
  phone: { type: Number },
  city: { type: String },
  state: { type: String },
  zip: { type: Number }
});

ClientSchema.index({
  advisor: 1,
  name: 1,
  email: 1,
  sex: 1
});

module.exports = mongoose.model('Client', ClientSchema);

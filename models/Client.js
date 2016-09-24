var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var ClientSchema = new Schema({
  advisor: { type: ObjectId, ref: 'User', required: true },
  user: { type: ObjectId, ref: 'User' },
  name: { type: String, required: true },
  phone: { type: Number },
  email: { type: String },
  gender: { type: Number }, // 1 for male, 2 for female
  categories: { type: [Number] },
  education: { type: String },
  age: { type: Number },
  married: { type: Boolean },
  childrens: { type: Number },
  job: { type: String },
  income: { type: String },
  debts: [{
    name: { type: String },
    detail: { type: String }
  }],
  note: { type: String },
  country: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: Number }
});

ClientSchema.index({
  advisor: 1,
  name: 1,
  email: 1,
  sex: 1,
  categories: 1
});

module.exports = mongoose.model('Client', ClientSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var ClientSchema = new Schema({
  advisor: { type: ObjectId, ref: 'User', required: true },
  user: { type: ObjectId, ref: 'User' },
  name: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  gender: { type: String }, // 1 for male, 2 for female
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
  address: { type: String },
  note: { type: String },
  country: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: Number },
  fields: [{
    key: String,
    value: String,
    _id: false
  }],
  profile: {
    married: Boolean,
    homeowner: Boolean,
    income: Boolean,
    ambitious: Boolean,
    dissatisfied: Boolean,
    coachable: Boolean,
    rating: Number
  }
});

ClientSchema.index({ advisor: 1, name: 1 }); // for advisor search client name
ClientSchema.index({ advisor: 1, email: 1}); // for advisor search client email
ClientSchema.index({ advisor: 1, categories: 1}); // for advisor search client categories

module.exports = mongoose.model('Client', ClientSchema);

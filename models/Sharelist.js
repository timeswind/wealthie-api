var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var SharelistSchema = new Schema({
  advisor: { type: ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  spouseName: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
  phone: { type: String },
  email: { type: String },
  gender: { type: String }, // 1 for male, 2 for female
  categories: { type: [Number] },
  age: { type: Number },
  profile: {
    married: Boolean,
    homeowner: Boolean,
    income: Boolean,
    ambitious: Boolean,
    dissatisfied: Boolean,
    coachable: Boolean,
    rating: Number
  },
  fields: [{
    key: String,
    value: String,
    _id: false
  }]
});

SharelistSchema.index({ advisor: 1, name: 1 }); // for advisor search client name
SharelistSchema.index({ advisor: 1, email: 1}); // for advisor search client email
SharelistSchema.index({ advisor: 1, categories: 1}); // for advisor search client categories

module.exports = mongoose.model('Sharelist', SharelistSchema);

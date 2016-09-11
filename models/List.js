var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var ListSchema = new Schema({
  advisor: { type: ObjectId, ref: 'User' },
  affiliation: { type: String },
  experience: [{ title: String, text: String }],
  loc: { type: [Number], index: '2dsphere'},
  address: { type: String },
  independent: { type: Boolean, required: true },
  categories: { type:[Number], required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true },
  brief: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

ListSchema.index({
  independent: 1,
  catagories: 1
});

module.exports = mongoose.model('List', ListSchema);

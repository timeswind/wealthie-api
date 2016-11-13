var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var ListSchema = new Schema({
  listBy: { type: ObjectId, ref: 'User' },
  public: { type: Boolean, default: false },
  profileImage: {
    key: String,
    service: String
  },
  name: { type: String },
  advisor: { type: ObjectId, ref: 'User' },
  affiliation: { type: String },
  experience: [{ title: String, text: String, _id: false}],
  loc: { type: [Number] },
  address: { type: String },
  room: { type: String },
  independent: { type: Boolean, required: true },
  categories: { type:[Number], required: true },
  phone: { type: Number, required: true },
  email: { type: String },
  brief: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

ListSchema.index({
  listBy: 1,
  public: 1,
  name: 1,
  independent: 1,
  affiliation: 1,
  catagories: 1,
  loc: '2dsphere'
});

module.exports = mongoose.model('List', ListSchema);

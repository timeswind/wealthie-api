var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var ListSchema = new Schema({
  listBy: { type: ObjectId, ref: 'User' },
  profileImage: {
    key: String,
    service: String
  },
  name: { type: String },
  advisor: { type: ObjectId, ref: 'User' },
  affiliation: { type: String },
  experience: [{ title: String, text: String, _id: false}],
  room: { type: String },
  phones: [{ type: String, _id: false }],
  addresses: [{
    formattedAddress: String,
    streetAddress: String,
    addressLocality: String,
    addressRegion: String,
    postalCode: String,
    loc: { type: [Number] },
    _id: false
  }],
  minimums: [{ title: String, text: String, _id: false}],
  compensations: [{ title: String, text: String, _id: false}],
  certifications: [{ title: String, text: String, _id: false}],
  certHeaders: [{ type: String, _id: false }],
  specialties: { type: String },
  independent: { type: Boolean, required: true },
  categories: { type:[Number], required: true },
  email: { type: String },
  brief: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  wechat: {
    openid:{ type: String },
    nickname: { type: String }, //用户昵称
    sex: { type: Number }, // 用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
    province: { type: String },
    city: { type: String },
    country: { type: String },
    privilege: [{ type: String }]
  }
});

ListSchema.index({ name: 1 })
ListSchema.index({ "addresses.loc": '2dsphere', independent: 1, affiliation: 1 })
ListSchema.index({ "addresses.postalCode": 1, independent: 1, affiliation: 1 })
ListSchema.index({ "addresses.addressRegion": 1, independent: 1, affiliation: 1 })
ListSchema.index({ categories: 1, independent: 1, affiliation: 1 })
ListSchema.index({ categories: 1, independent: 1, affiliation: 1 })
ListSchema.index({ categories: 1, independent: 1, affiliation: 1 })

// db.lists.createIndex({name: 1}, {background: true})
// db.lists.createIndex({"addresses.loc": '2dsphere', categories: 1, independent: 1, affiliation: 1}, {background: true})
// db.lists.createIndex({"addresses.postalCode": 1, categories: 1, independent: 1, affiliation: 1}, {background: true})
// db.lists.createIndex({"addresses.addressRegion": 1, categories: 1, independent: 1, affiliation: 1}, {background: true})

module.exports = mongoose.model('List', ListSchema);

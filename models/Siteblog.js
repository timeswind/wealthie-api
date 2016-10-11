var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var SiteblogSchema = new Schema({
  user: { type: ObjectId, ref: 'User', required: true},
  title: { type: String, required: true },
  content: { type: String, required: true },
  views: { type: Number },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

SiteblogSchema.index({
  user: 1,
  title: 1
});

module.exports = mongoose.model('Siteblog', SiteblogSchema);

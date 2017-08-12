var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var ContactlistSchema = new Schema({
  user: { type: ObjectId, ref: 'User' },
  contacts: [{ type: ObjectId, ref: 'User' }],
  unread: { type: Number }
});


ContactlistSchema.index({ user: 1 });

module.exports = mongoose.model('Contactlist', ContactlistSchema);

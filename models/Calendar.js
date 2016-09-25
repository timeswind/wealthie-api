var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CalendarSchema = new Schema({
  advisor: { type: ObjectId, ref: 'User', required: true },
  month: { type: Date, required: true }, // month
  available: [{
    from: { type: Date },
    to: { type: Date }
  }]
});

CalendarSchema.index({
  advisor: 1,
  timestamp: 1
});

module.exports = mongoose.model('Calendar', CalendarSchema);

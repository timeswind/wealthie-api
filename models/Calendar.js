var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CalendarSchema = new Schema({
  advisor: { type: ObjectId, ref: 'User', required: true },
  month: { type: Number, required: true }, // month code 201601
  available: [{
    day: { type: Number }, // monday to sunday
    date: { type: Date, required: false }, // optional
    from: { type: Number }, // 0 - 1440 (24*60)(a day)
    to: { type: Number }, // 0 - 1440 (24*60)(a day)
  }]
});

CalendarSchema.index({ advisor: 1, month: 1});

module.exports = mongoose.model('Calendar', CalendarSchema);

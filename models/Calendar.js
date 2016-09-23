var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CalendarSchema = new Schema({
  advisor: { type: ObjectId, ref: 'User', required: true },
  timestamp: { type: Date, required: true }, // month
  appointments: [{ type: ObjectId, ref: 'Appointment' }]
});

CalendarSchema.index({
  advisor: 1,
  timestamp: 1
});

module.exports = mongoose.model('Calendar', CalendarSchema);

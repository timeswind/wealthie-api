var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var AppointmentSchema = new Schema({
  advisor: { type: ObjectId, ref: 'User', required: true },
  timestamp_month: { type: Date, required: true },
  first: [{
    index: { type: Number }, // 0-96
    client: { type: ObjectId, ref: 'User' },
    note: { type: String }
  }],
  second: [{
    index: { type: Number }, // 0-96
    client: { type: ObjectId, ref: 'User' },
    note: { type: String }
  }],
  third: [{
    index: { type: Number }, // 0-96
    client: { type: ObjectId, ref: 'User' },
    note: { type: String }
  }],
  fourth: [{
    index: { type: Number }, // 0-96
    client: { type: ObjectId, ref: 'User' },
    note: { type: String }
  }]
});

AppointmentSchema.index({
  independent: 1,
  catagories: 1,
  loc: '2dsphere'
});

module.exports = mongoose.model('Appointment', AppointmentSchema);

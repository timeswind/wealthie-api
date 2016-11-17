var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var AppointmentSchema = new Schema({
  advisor: { type: ObjectId, ref: 'User', required: true },
  client: { type: ObjectId, ref: 'Client', required: true },
  user: { type: ObjectId, ref: 'User' },
  date: { type: Date },
  start: { type: Number }, // 0-1440 represent minute pass in a day
  end: { type: Number },  // 0-1440 represent minute pass in a day
  note: { type: String }, // for advisor || reject/cancel reason
  status: {
    type: String,
    enum: ['pending', 'scheduled', 'cancel', 'reject']
  } // pending scheduled complete
});

AppointmentSchema.index({ advisor: 1, client: 1, date: 1 })
AppointmentSchema.index({ advisor: 1, user: 1, date: 1 })
AppointmentSchema.index({ user: 1, advisor: 1,  date: 1 })
AppointmentSchema.index({ user: 1, status: 1 })
module.exports = mongoose.model('Appointment', AppointmentSchema);

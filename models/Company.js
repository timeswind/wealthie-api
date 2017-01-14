var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CompanySchema = new Schema({
  logo: { type: String },
  joinAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Company', CompanySchema);

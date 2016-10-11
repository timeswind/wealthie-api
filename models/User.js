var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var ObjectId = Schema.Types.ObjectId;

var UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true},
  verify: { type: Boolean, default: false },
  password: { type: String, required: true },
  affiliation: { type: String },
  role: { type: Number, required: true }, //  1 for normal user, 2 for agents, 3 for independent, 11 for premium user, 000 for admin, 001 for blog manager
  balance: { type: Number },
  pendingTransactions: [{ type: ObjectId, ref: "Transaction" }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

UserSchema.index({email: 1});

// methods ======================
// generating a hash
UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);

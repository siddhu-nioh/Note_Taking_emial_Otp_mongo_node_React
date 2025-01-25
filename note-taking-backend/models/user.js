const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dateOfBirth: { type: Date, required: true },
  otp: { type: String },
  otpExpiry: { type: Date },
});

module.exports = mongoose.model('User', userSchema);
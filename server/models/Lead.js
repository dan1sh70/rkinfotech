const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  type: { type: String, enum: ['candidate', 'employer'], required: true },
  serviceOfInterest: { type: String },
  message: { type: String },
  resumeUrl: { type: String }, // Optional, for candidates
  status: { type: String, default: 'new' }, // new, contacted, enrolled/closed
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lead', LeadSchema);

const mongoose = require('mongoose');

const ReferralSchema = new mongoose.Schema({
  referrerName: { type: String, required: true },
  referrerEmail: { type: String, required: true },
  referralCode: { type: String, required: true, unique: true },
  referredLeads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lead' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Referral', ReferralSchema);

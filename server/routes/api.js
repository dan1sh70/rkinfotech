const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const Referral = require('../models/Referral');
// Note: In a production app, we would configure multer here for resume uploads

// Create a new lead (Contact form submission)
router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, type, serviceOfInterest, message } = req.body;
    
    // In a real app we would save to DB:
    // const newLead = new Lead({ name, email, phone, type, serviceOfInterest, message });
    // await newLead.save();
    
    res.status(201).json({ success: true, message: 'Lead created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Generate a referral link
router.post('/referrals', async (req, res) => {
  try {
    const { referrerName, referrerEmail } = req.body;
    const referralCode = Math.random().toString(36).substring(2, 10).toUpperCase();
    
    // In a real app we would save to DB:
    // const newReferral = new Referral({ referrerName, referrerEmail, referralCode });
    // await newReferral.save();
    
    res.status(201).json({ success: true, referralCode, referralLink: `https://rkinfotechllc.com/contact?ref=${referralCode}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;

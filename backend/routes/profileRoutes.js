const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

// Get Profile
router.get('/', async (req, res) => {
    try {
        const profile = await Profile.findOne().sort({ createdAt: -1 });
        return res.status(200).json(profile || { bio: '', projects: [], otherDetails: '' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

// Save / Update Profile
router.post('/', async (req, res) => {
    try {
        const { bio, projects, otherDetails } = req.body;

        const profile = await Profile.findOneAndUpdate(
            {},
            { bio, projects, otherDetails },
            { new: true, upsert: true }
        );

        return res.status(201).json(profile);

    } catch (err) {
        console.error('Profile Route Error:', err);
        return res.status(500).json({ error: 'Failed to save profile' });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Preference = require('../models/Preference');

// Get Preferences
router.get('/', async (req, res) => {
    try {
        const preferences = await Preference.findOne().sort({ createdAt: -1 });
        if (!preferences) {
            // Return empty object or specific message if no preferences found yet
            // The frontend might expect default values if empty.
            // For now, let's return a 200 with null or a message, or 404? 
            // Better to return 200 and null data to avoid errors in simple clients.
            return res.status(200).json(null);
        }
        res.json(preferences);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Save/Update Preferences
router.post('/', async (req, res) => {
    try {
        const { role, skills, maxExperience, locations } = req.body;

        // Upsert logic: Update if exists, Insert if not
        const preference = await Preference.findOneAndUpdate(
            {}, // find the first document (we assume single user context)
            { role, skills, maxExperience, locations },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.status(201).json(preference);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;

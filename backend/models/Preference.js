const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({
    role: { type: String, required: true },
    skills: { type: [String], required: true },
    maxExperience: { type: Number, required: true },
    locations: { type: [String], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Preference', preferenceSchema);

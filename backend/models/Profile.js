const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    techStack: { type: [String], default: [] },
    link: { type: String, default: '' }
});

const profileSchema = new mongoose.Schema({
    bio: { type: String, default: '' },
    projects: [projectSchema],
    otherDetails: { type: String, default: '' } // "What he knows" / miscellaneous
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);

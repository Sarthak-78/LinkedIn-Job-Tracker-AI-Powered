import React, { useState } from 'react';
import axios from 'axios';


const PreferenceForm = ({ onSave }) => {
    const [formData, setFormData] = useState({
        role: '',
        skills: '',
        maxExperience: 0,
        locations: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        // Transform data
        const payload = {
            role: formData.role,
            skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
            maxExperience: Number(formData.maxExperience),
            locations: formData.locations.split(',').map(l => l.trim()).filter(Boolean)
        };

        try {
            const response = await axios.post('http://localhost:5000/preferences', payload);
            setMessage({ type: 'success', text: 'Preferences saved successfully!' });
            if (onSave) onSave(); // Refresh parent
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: 'Failed to save preferences.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card form-card fade-in">
            <h2>Update Preferences</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="role">Target Role</label>
                    <input
                        type="text"
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        placeholder="e.g. Frontend Developer"
                        required
                        className="input-field"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="skills">Skills (comma separated)</label>
                    <input
                        type="text"
                        id="skills"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        placeholder="e.g. React, Node.js, CSS"
                        required
                        className="input-field"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="maxExperience">Years of Experience</label>
                    <input
                        type="number"
                        id="maxExperience"
                        name="maxExperience"
                        value={formData.maxExperience}
                        onChange={handleChange}
                        min="0"
                        required
                        className="input-field"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="locations">Preferred Locations (comma separated)</label>
                    <input
                        type="text"
                        id="locations"
                        name="locations"
                        value={formData.locations}
                        onChange={handleChange}
                        placeholder="e.g. Remote, New York, London"
                        required
                        className="input-field"
                    />
                </div>

                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Preferences'}
                </button>

                {message && (
                    <div className={`message ${message.type}`}>
                        {message.text}
                    </div>
                )}
            </form>
        </div>
    );
};

export default PreferenceForm;

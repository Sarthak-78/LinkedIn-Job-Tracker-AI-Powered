import React, { useEffect, useState } from 'react';
import axios from 'axios';


const PreferenceDisplay = ({ refreshTrigger }) => {
    const [preferences, setPreferences] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPreferences = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/preferences');
                if (response.data) {
                    setPreferences(response.data);
                }
            } catch (error) {
                console.error("Error fetching preferences:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPreferences();
    }, [refreshTrigger]);

    if (loading) return <div className="loading-spinner">Loading...</div>;
    if (!preferences) return <div className="empty-state">No preferences set yet.</div>;

    return (
        <div className="card display-card fade-in" style={{ animationDelay: '0.2s' }}>
            <h2>Current Profile</h2>

            <div className="detail-row">
                <span className="label">Target Role</span>
                <span className="value highlight">{preferences.role}</span>
            </div>

            <div className="detail-item">
                <span className="label">Skills</span>
                <div className="tags">
                    {preferences.skills.map((skill, index) => (
                        <span key={index} className="tag">{skill}</span>
                    ))}
                </div>
            </div>

            <div className="detail-row">
                <span className="label">Experience</span>
                <span className="value">{preferences.maxExperience} Years</span>
            </div>

            <div className="detail-item">
                <span className="label">Locations</span>
                <div className="tags">
                    {preferences.locations.map((loc, index) => (
                        <span key={index} className="tag location-tag">{loc}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PreferenceDisplay;

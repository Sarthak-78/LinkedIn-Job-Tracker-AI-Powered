import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileForm = ({ onSave }) => {
    const [bio, setBio] = useState('');
    const [otherDetails, setOtherDetails] = useState('');
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await axios.get('http://localhost:5000/profile');
            if (res.data) {
                setBio(res.data.bio || '');
                setOtherDetails(res.data.otherDetails || '');
                setProjects(res.data.projects || []);
            }
        } catch (err) {
            console.error("Failed to fetch profile", err);
        }
    };

    const handleProjectChange = (index, field, value) => {
        const newProjects = [...projects];
        newProjects[index][field] = value;
        setProjects(newProjects);
    };

    const handleAddProject = () => {
        setProjects([...projects, { name: '', description: '', techStack: [], link: '' }]);
    };

    const handleRemoveProject = (index) => {
        const newProjects = projects.filter((_, i) => i !== index);
        setProjects(newProjects);
    };

    const handleTechStackChange = (index, value) => {
        // Convert comma separated string to array
        const techs = value.split(',').map(s => s.trim()); // .filter(Boolean) if we want to remove empty strings immediately, but might annoy typing
        const newProjects = [...projects];
        newProjects[index].techStack = techs;
        setProjects(newProjects);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const payload = {
            bio,
            otherDetails,
            projects: projects.map(p => ({
                ...p,
                techStack: Array.isArray(p.techStack) ? p.techStack.filter(Boolean) : []
            }))
        };

        try {
            await axios.post('http://localhost:5000/profile', payload);
            setMessage({ type: 'success', text: 'Profile saved successfully!' });
            if (onSave) onSave();
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: 'Failed to save profile.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card form-card fade-in" style={{ marginTop: '2rem' }}>
            <h2>Update Profile & Projects</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="bio">Bio / Summary</label>
                    <textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Brief professional summary..."
                        className="input-field"
                        rows="3"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="otherDetails">Other Details / What you know</label>
                    <textarea
                        id="otherDetails"
                        value={otherDetails}
                        onChange={(e) => setOtherDetails(e.target.value)}
                        placeholder="Certifications, specific domain knowledge, etc..."
                        className="input-field"
                        rows="3"
                    />
                </div>

                <h3>Projects</h3>
                {projects.map((project, index) => (
                    <div key={index} style={{
                        border: '1px solid rgba(255,255,255,0.1)',
                        padding: '1rem',
                        marginBottom: '1rem',
                        borderRadius: '0.5rem',
                        backgroundColor: 'rgba(0,0,0,0.2)'
                    }}>
                        <div className="form-group">
                            <label>Project Name</label>
                            <input
                                type="text"
                                value={project.name}
                                onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                                className="input-field"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                value={project.description}
                                onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                                className="input-field"
                                rows="2"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Tech Stack (comma separated)</label>
                            <input
                                type="text"
                                value={project.techStack.join(', ')}
                                onChange={(e) => handleTechStackChange(index, e.target.value)}
                                className="input-field"
                                placeholder="React, Node.js, MongoDB"
                            />
                        </div>
                        <div className="form-group">
                            <label>Link (optional)</label>
                            <input
                                type="text"
                                value={project.link}
                                onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
                                className="input-field"
                                placeholder="https://github.com/..."
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => handleRemoveProject(index)}
                            className="btn-primary"
                            style={{ backgroundColor: '#ef4444', backgroundImage: 'none', width: 'auto', padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                        >
                            Remove Project
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={handleAddProject}
                    className="btn-primary"
                    style={{ backgroundColor: '#3b82f6', backgroundImage: 'none', marginBottom: '1rem' }}
                >
                    + Add Project
                </button>

                <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '1rem 0' }} />

                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Saving Profile...' : 'Save Profile'}
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

export default ProfileForm;

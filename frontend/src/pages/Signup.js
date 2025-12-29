import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/signup', formData);
            alert("Account created! Welcome to Deep_SQL.");
            navigate('/login');
        } catch (err) {
            alert(err.response?.data?.error || "Signup failed");
        }
    };

    return (
        <div className="lc-auth-page">
            <div className="lc-auth-card">
                <div className="lc-logo">
                    <span className="logo-icon">DP</span>
                    <h2>Deep_SQL</h2>
                </div>
                
                <form className="lc-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input type="text" placeholder="Username" onChange={(e) => setFormData({...formData, username: e.target.value})} required />
                    </div>
                    <div className="input-group">
                        <input type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                    </div>
                    <div className="input-group">
                        <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                    </div>
                    <button type="submit" className="btn-primary">Create Account</button>
                    
                    <div className="form-footer">
                        <span>Already have an account? <Link to="/login">Sign in</Link></span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
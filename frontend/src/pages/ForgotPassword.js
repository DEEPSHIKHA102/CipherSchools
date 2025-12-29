import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Auth.scss';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
        setMessage(res.data.message); 
    } catch (err) {
        
        setMessage(err.response?.data?.error || "An error occurred.");
    }
};

    return (
        <div className="lc-auth-page">
            <div className="lc-auth-card">
                <div className="lc-logo">
                    <span className="logo-icon">DP</span>
                    <h2>Reset Password</h2>
                </div>
                <form className="lc-form" onSubmit={handleSubmit}>
                    {message && <div className="info-banner">{message}</div>}
                    <div className="input-group">
                        <input 
                            type="email" 
                            placeholder="Registered Email" 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="btn-primary">Send Reset Link</button>
                    <div className="form-footer">
                        <Link to="/login">Back to Sign In</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.scss';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Invalid email or password');
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
                    {error && <div className="error-banner">{error}</div>}
                    
                    <div className="input-group">
                        <input 
                            type="email" 
                            placeholder="Email" 
                            onChange={(e) => setFormData({...formData, email: e.target.value})} 
                            required 
                        />
                    </div>
                    
                    <div className="input-group">
                        <input 
                            type="password" 
                            placeholder="Password" 
                            onChange={(e) => setFormData({...formData, password: e.target.value})} 
                            required 
                        />
                    </div>

                    <button type="submit" className="btn-primary">Sign In</button>
                    
                    <div className="form-footer">
                        <Link to="/forgot-password">Forgot Password?</Link>
                        <span>Don't have an account? <Link to="/signup">Sign up</Link></span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
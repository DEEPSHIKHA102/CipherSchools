import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <nav className="main-nav">
            <div className="nav-logo">
                <Link to="/">Deep_SQL</Link>
            </div>
            <div className="nav-links">
                {token ? (
                    <>
                        <Link to="/dashboard">My Progress</Link>
                        <span className="user-welcome">Hi, {user?.username}</span>
                        <button onClick={handleLogout} className="btn-logout">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup" className="btn-signup">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
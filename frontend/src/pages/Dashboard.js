import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.scss';

const Dashboard = () => {
    const [data, setData] = useState({ 
        assignments: [], 
        stats: { total: 0, completed: 0 } 
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboard = async () => {
            const token = localStorage.getItem('token');
            
           
            if (!token) {
                return navigate('/login');
            }

            try {
                setLoading(true);
                const res = await axios.get('http://localhost:5000/api/assignments/user-dashboard', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                
                setData(res.data);
            } catch (err) {
                console.error("Dashboard Load Error", err);
                if (err.response?.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, [navigate]);

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="spinner"></div>
                <p>Loading your SQL Journey...</p>
            </div>
        );
    }

    return (
        <div className="dashboard-page">
            <header className="dash-header">
                <div className="header-text">
                    <h1>My SQL Learning Journey</h1>
                    <p>Master database queries one challenge at a time.</p>
                </div>
                
               
            </header>

            <div className="assignment-grid">
                {data.assignments.length > 0 ? (
                    data.assignments.map((asn) => (
                        <div 
                            key={asn._id} 
                            className={`card ${asn.isCompleted ? 'is-done' : ''}`}
                        >
                            
                            <span className={`badge ${asn.difficulty?.toLowerCase()}`}>
                                {asn.difficulty}
                            </span>

                            <div className="card-content">
                                <h3>{asn.title}</h3>
                                <p>{asn.description}</p>
                            </div>

                            <div className="card-footer">
                                <button 
                                    className={asn.isCompleted ? "btn-review" : "btn-attempt"}
                                    onClick={() => navigate(`/attempt/${asn._id}`)}
                                >
                                    {asn.isCompleted ? "Review it" : "Attempt"}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-state">
                        <p>No assignments found. Check back later!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
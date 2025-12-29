import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.scss';

const Home = () => {
    const [assignments, setAssignments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/api/assignments')
            .then(res => setAssignments(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Deep_SQL Studio</h1>
                <p>Master PostgreSQL with interactive challenges</p>
            </header>

            <div className="problem-list-wrapper">
                <table className="problem-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Difficulty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignments.map((asn, i) => (
                            <tr key={asn._id} className="problem-row">
                                <td className="problem-index">{i + 1}</td>
                                <td className="problem-title">
                                    <span onClick={() => navigate(`/attempt/${asn._id}`)}>
                                        {asn.title}
                                    </span>
                                </td>
                                <td className={`problem-difficulty ${asn.difficulty?.toLowerCase()}`}>
                                    {asn.difficulty || 'Easy'}
                                </td>
                                <td>
                                    <button 
                                        className="btn-attempt" 
                                        onClick={() => navigate(`/attempt/${asn._id}`)}
                                    >
                                        Solve
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;
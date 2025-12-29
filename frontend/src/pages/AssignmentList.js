import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAssignments } from '../services/api';

const AssignmentList = () => {
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        fetchAssignments().then(res => setAssignments(res.data));
    }, []);

    return (
        <div className="assignment-list">
            <h1 className="assignment-list__title">SQL Assignments</h1>
            <div className="assignment-list__grid">
                {assignments.map(asgn => (
                    <div key={asgn._id} className="assignment-card">
                        <span className={`badge badge--${asgn.description.toLowerCase()}`}>
                            {asgn.description}
                        </span>
                        <h3 className="assignment-card__name">{asgn.title}</h3>
                        <p className="assignment-card__question">{asgn.question}</p>
                        <Link to={`/attempt/${asgn._id}`} className="btn btn--primary">
                            Attempt Assignment
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AssignmentList;
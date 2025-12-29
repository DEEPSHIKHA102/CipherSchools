import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import { fetchAssignmentById, runQuery, getAiHint } from '../services/api';
import './AssignmentAttempt.scss';

const AssignmentAttempt = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [assignment, setAssignment] = useState(null);
    const [sqlQuery, setSqlQuery] = useState('SELECT * FROM employees;');
    const [results, setResults] = useState([]);
    const [hint, setHint] = useState('');
    const [error, setError] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        const errorHandler = (e) => {
            if (e.message.includes('ResizeObserver loop completed with undelivered notifications')) {
                if (e.stopImmediatePropagation) e.stopImmediatePropagation();
                e.preventDefault();
                return false;
            }
        };
        window.addEventListener('error', errorHandler);
        return () => window.removeEventListener('error', errorHandler);
    }, []);

    useEffect(() => {
        setLoading(true);
        fetchAssignmentById(id)
            .then(res => {
                setAssignment(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Fetch Error:", err);
                setLoading(false);
            });
    }, [id]);

    
useEffect(() => {
    const errorHandler = (e) => {
        if (e.message.includes('ResizeObserver loop completed with undelivered notifications')) {
          
            if (e.stopImmediatePropagation) e.stopImmediatePropagation();
            e.preventDefault();
            return false;
        }
    };
    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
}, []);

    

   const validateAnswer = (liveData, expectedData) => {
    if (!liveData || !expectedData || liveData.length !== expectedData.length) return false;

    const normalize = (arr) => {
        return arr.map(row => {
            const filtered = {};
            
            Object.keys(expectedData[0]).forEach(key => {
                
                filtered[key] = String(row[key]); 
            });
            
            return JSON.stringify(Object.entries(filtered).sort());
        }).sort(); 
    };

    return JSON.stringify(normalize(liveData)) === JSON.stringify(normalize(expectedData));
};
    
    const handleExecute = async () => {
        setError('');
        setResults([]);
        setIsCorrect(null);
        setHint('');

        try {
            const res = await runQuery(sqlQuery);
            const rows = res.data.rows || res.data;

            if (rows) {
                setResults(rows);

                
                console.log("DEBUG: USER SQL RESULT (rows):", rows);
                console.log("DEBUG: EXPECTED VALUE:", assignment?.expectedOutput?.value);
                
                if (assignment?.expectedOutput?.value) {
                    const match = validateAnswer(rows, assignment.expectedOutput.value);
                    setIsCorrect(match);
                    
                    
                    if (match) {
                        const token = localStorage.getItem('token');
                        await axios.post('http://localhost:5000/api/assignments/save-attempt', 
                            { assignmentId: id }, 
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                    }
                }
            }
        } catch (err) {
            setError(err.response?.data?.error || "SQL Syntax Error. Check your query.");
        }
    };

   
    const handleGetHint = async () => {
        setHint('AI is analyzing your query...');
        try {
            const res = await getAiHint(assignment?.question, sqlQuery);
            setHint(res.data.hint);
        } catch (err) {
            setHint("AI Hint: " + (err.response?.data?.error || "Unable to reach AI service."));
        }
    };

    if (loading) return <div className="loader">Loading Problem...</div>;

    return (
        <div className="leetcode-workspace">
          
            <nav className="lc-nav">
                <div className="nav-left">
                    <button onClick={() => navigate('/dashboard')} className="back-link">
                        ← Problems
                    </button>
                    <span className="divider">|</span>
                    <span className="prob-title">{assignment?.title}</span>
                </div>
            </nav>

            <div className="content-split">
                
                <aside className="description-panel">
                    <div className="panel-tabs">
                        <button className="active">Description</button>
                    </div>
                    <div className="panel-body">
                        <h2>{assignment?.title}</h2>
                        <div className="diff-badge easy">Easy</div>
                        <p className="description-text">{assignment?.question}</p>

                        <div className="example-section">
                            {assignment?.sampleTables?.map((table, i) => (
                                <div key={i} className="lc-example">
                                    <h4>Table: <code>{table.tableName}</code></h4>
                                    <div className="table-scroll">
                                        <table className="lc-table">
                                            <thead>
                                                <tr>{table.columns?.map((col, idx) => <th key={idx}>{col.columnName}</th>)}</tr>
                                            </thead>
                                            <tbody>
                                                {table.rows?.map((row, rIdx) => (
                                                    <tr key={rIdx}>
                                                        {table.columns?.map((col, cIdx) => <td key={cIdx}>{row[col.columnName]}</td>)}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                
                <main className="editor-panel">
                    <div className="editor-header">
                        <span>SQL Editor (PostgreSQL)</span>
                    </div>
                    
                    <div className="monaco-wrapper">
                        <Editor 
                            height="100%" 
                            defaultLanguage="sql" 
                            theme="vs-dark" 
                            value={sqlQuery} 
                            onChange={(v) => setSqlQuery(v)} 
                            options={{ 
                                minimap: { enabled: false }, 
                                fontSize: 14,
                                automaticLayout: true, 
                                scrollBeyondLastLine: false 
                            }}
                        />
                    </div>
                    
                    <div className="console-panel">
                        <div className="console-tabs">
                            <div className="toolbar-left">
                                <button onClick={handleExecute} className="btn-run">Run Query</button>
                                <button onClick={handleGetHint} className="btn-hint">Get Hint</button>
                            </div>
                            <div className="toolbar-right">
                                {isCorrect === true && <span className="txt-success">✔ Accepted</span>}
                                {isCorrect === false && results.length > 0 && <span className="txt-fail">✖ Wrong Answer</span>}
                            </div>
                        </div>

                        <div className="console-output">
                            {error && <div className="lc-error">{error}</div>}
                            {hint && <div className="lc-hint">{hint}</div>}
                            
                            {results.length > 0 ? (
                                <div className="table-scroll">
                                    <table className="lc-table results">
                                        <thead>
                                            <tr>{Object.keys(results[0]).map(k => <th key={k}>{k}</th>)}</tr>
                                        </thead>
                                        <tbody>
                                            {results.map((row, i) => (
                                                <tr key={i}>
                                                    {Object.values(row).map((val, j) => <td key={j}>{val?.toString()}</td>)}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                !error && <p className="lc-placeholder">Results will appear here after running your query.</p>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AssignmentAttempt;
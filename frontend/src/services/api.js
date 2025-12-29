import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';


export const fetchAssignmentById = (id) => {
    return axios.get(`${API_BASE_URL}/assignments/${id}`);
};


export const runQuery = (sql) => {
    return axios.post(`${API_BASE_URL}/query/run`, { query: sql });
};


export const getAiHint = (question, currentQuery) => {
    return axios.post(`${API_BASE_URL}/hints/get`, { 
        question: question, 
        currentQuery: currentQuery 
    });
};

const apiService = {
    fetchAssignmentById,
    runQuery,
    getAiHint
};

export default apiService;
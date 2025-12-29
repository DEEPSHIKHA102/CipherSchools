require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectMongo = require('./config/db'); 
const pool = require('./config/pg'); 


const app = express(); 


app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(express.json());


connectMongo();


const hintRoutes = require('./routes/hintroutes');
const authRoutes = require('./routes/authroutes'); 
const assignmentRoutes = require('./routes/assignmentroutes');
const queryRoutes = require('./routes/queryroutes');

app.use('/api/auth', authRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/query', queryRoutes);
app.use('/api/hints', hintRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



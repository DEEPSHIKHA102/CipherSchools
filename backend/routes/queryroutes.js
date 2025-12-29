const express = require('express');
const router = express.Router();
const pool = require('../config/pg'); 

router.post('/run', async (req, res) => {
    const { query } = req.body;
    try {
        const result = await pool.query(query);
        res.status(200).json({ rows: result.rows });
    } catch (err) {
        
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
const pool = require("../config/pg");

exports.executeQuery = async (req, res) => {
  try {
    const { sqlQuery } = req.body;
    

    if (!sqlQuery.toLowerCase().trim().startsWith("select")) {
      return res.status(403).json({ error: "Only SELECT queries are allowed." });
    }

    const result = await pool.query(sqlQuery);
    
    console.log("Postgres Data:", result.rows); 
    
    res.json({ rows: result.rows }); 
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');
const auth = require("../middleware/auth");
const { getUserDashboard } = require("../controllers/dashboardController");
const { saveAttempt } = require("../controllers/assignmentController");


router.get('/', async (req, res) => {
    try {
        const assignments = await Assignment.find();
        res.json(assignments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/user-dashboard", auth, getUserDashboard);

router.post("/save-attempt", auth, saveAttempt);
router.get('/:id', async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);
        res.json(assignment);
    } catch (err) {
        res.status(404).json({ message: "Assignment not found" });
    }
});

module.exports = router;



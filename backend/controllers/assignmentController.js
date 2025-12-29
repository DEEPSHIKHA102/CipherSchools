const Submission = require("../models/Submission");

exports.saveAttempt = async (req, res) => {
    try {
        const { assignmentId, sqlQuery, isCorrect } = req.body;
        const userId = req.user.id; 

        const submission = await Submission.findOneAndUpdate(
            { userId, assignmentId },
            { 
                submittedQuery: sqlQuery, 
                status: isCorrect ? 'completed' : 'attempted' 
            },
            { upsert: true, new: true }
        );

        res.status(200).json({ success: true, submission });
    } catch (err) {
        res.status(500).json({ error: "Failed to save progress to database" });
    }
};
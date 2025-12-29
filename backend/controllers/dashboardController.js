const Assignment = require("../models/Assignment");
const Submission = require("../models/Submission");

exports.getUserDashboard = async (req, res) => {
    try {
        const userId = req.user.id;

        
        const allAssignments = await Assignment.find();
        
        
        const userSubmissions = await Submission.find({ userId });

         const dashboardData = allAssignments.map(asn => {
            const userSub = userSubmissions.find(s => 
                s.assignmentId.toString() === asn._id.toString()
            );

            return {
                ...asn._doc,
                isCompleted: userSub ? userSub.status === 'completed' : false,
                lastSubmittedQuery: userSub ? userSub.submittedQuery : ""
            };
        });

        
        const total = allAssignments.length;
        const solved = userSubmissions.filter(s => s.status === 'completed').length;

        res.status(200).json({
            assignments: dashboardData,
            stats: { total, solved }
        });
    } catch (err) {
        res.status(500).json({ error: "Error calculating dashboard progress" });
    }
};
const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment", required: true },
    submittedQuery: { type: String, required: true },
    status: { type: String, enum: ['attempted', 'completed'], default: 'attempted' }
}, { timestamps: true });

module.exports = mongoose.model("Submission", SubmissionSchema);
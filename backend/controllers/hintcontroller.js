const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

exports.getHint = async (req, res) => {
    try {
        const { question, currentQuery } = req.body;

        
        if (!question) {
            return res.status(400).json({ error: "Assignment question is required." });
        }
        const prompt = `You are a SQL Mentor. Assignment: "${question}" User's current code: "${currentQuery || 'No code yet'}"
            
            Task: Provide a helpful hint to guide the student toward the correct SQL syntax.
            Constraints:
            - Max 15 words.
            - DO NOT give the full answer.
            - DO NOT use code blocks.
            - Focus on concepts (e.g., "Try grouping by department").
        `;

        const result = await model.generateContent(prompt);
        const aiHint = result.response.text().trim();

        return res.status(200).json({ hint: aiHint });

    } catch (err) {
        console.error("AI Hint Error:", err.message);

        let fallbackHint = "Check your table names and column logic.";
        const q = req.body.question.toLowerCase();

        if (q.includes("count")) fallbackHint = "Try using the COUNT() function with a GROUP BY clause.";
        else if (q.includes("highest") || q.includes("max")) fallbackHint = "Think about using MAX() or sorting by DESC with a LIMIT.";
        else if (q.includes("join")) fallbackHint = "Ensure you are connecting the tables using a common ID field.";
        else if (q.includes("salary")) fallbackHint = "Verify your WHERE clause handles the salary numerical range correctly.";

        return res.status(200).json({ 
            hint: fallbackHint,
            isAi: false 
        });
    }
};
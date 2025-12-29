const express = require('express');
const router = express.Router();
const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post('/get', async (req, res) => {
    const { question, currentQuery } = req.body;

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a SQL Tutor. Give a short 1-sentence hint for the SQL problem. Do not provide the SQL code solution."
                },
                {
                    role: "user",
                    content: `Problem: ${question}\nStudent's Query: ${currentQuery}`
                }
            ],
            model: "llama-3.3-70b-versatile",
        });

        const hintText = chatCompletion.choices[0].message.content;
        res.json({ hint: hintText });

    } catch (err) {
        console.error("Groq Error:", err.message);
        res.status(500).json({ error: "AI Hint Service is temporarily unavailable." });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { signup, login } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    console.log("Searching for email:", email); 

    try {
        
        const user = await User.findOne({ email: email.toLowerCase() });
        
        if (!user) {
            console.log("No user found in MongoDB for:", email);
            return res.status(404).json({ error: "Email not found." });
        }

        console.log("User found:", user.username);
        
        res.json({ message: "Password reset link sent to your email." });

    } catch (err) {
        console.error("Forgot Password Error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
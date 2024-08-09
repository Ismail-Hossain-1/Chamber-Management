const router = require('express').Router();
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');
const pool = require('../db/pool');


const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_EMAIL_PASS,
    },
});

// Endpoint to send verification email
router.post('/send-verification', async (req, res) => {
    const { email } = req.body;

    console.log(email)
    const token = jwt.sign({ email }, process.env.JWT_TOKEN, { expiresIn: '1h' });

    // Verification link
    const verificationUrl = `${process.env.FRONTEND_HTTPS}/verify-email?token=${token}`;

    // Send the email
    try {
        await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Email Verification',
            html: `<p>Please verify your email by clicking <a href="${verificationUrl}">here</a>.</p>`,
        });
        res.status(200).send('Verification email sent.');
    } catch (error) {
        res.status(500).send('Error sending email.');
    }
});

// Endpoint to verify the token
router.get('/verify-email', (req, res) => {
    const { token } = req.query; // Use req.query to access query parameters
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        pool.query('UPDATE tbl_doctors SET EmailConfirmed = 1 WHERE Email=? ', [decoded.email])

        res.status(200).send('Email verified successfully.');
    } catch (error) {
        res.status(400).send('Invalid or expired token.');
    }
});

module.exports=router

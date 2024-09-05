const express = require('express');
const router = express.Router();
const { sendOtp, verifyOtpAndSignup, resendOtp, login } = require('../controllers/userController');

router.post('/send-otp', sendOtp);
router.post('/verify-otp-and-signup', verifyOtpAndSignup);
router.post('/resend-otp', resendOtp);
router.post('/login', login);

module.exports = router;
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware.js');
const { getAllJobs, applyForJob, getAppliedJobs } = require('../controllers/applicationController');

router.get('/user-jobs', authenticateToken, getAllJobs); 
router.post('/apply-job', authenticateToken, applyForJob); 
router.get('/applied-jobs', authenticateToken, getAppliedJobs);
router.get('/auth-status', authenticateToken, (req, res) => {
  res.json({ user: req.user }); 
});
router.post('/logout', (req, res) => {
  res.clearCookie('authToken');
  res.json({ message: "Logged out successfully" });
});
module.exports = router;

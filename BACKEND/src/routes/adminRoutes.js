const express = require('express');
const router = express.Router();
const {
  getAllJobs,
  createJob,
  updateJob,
  deleteJob,
  getJobById,
  getAppliedJobsDetails 
} = require('../controllers/adminController');

router.post('/jobs', createJob);
router.get('/jobs', getAllJobs);
router.get('/jobs/:id', getJobById);
router.delete('/jobs/:id', deleteJob);
router.put('/jobs/:id', updateJob);
router.get('/applied-jobs', getAppliedJobsDetails);

module.exports = router;

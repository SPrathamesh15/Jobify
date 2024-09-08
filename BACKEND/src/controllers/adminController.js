const Job = require('../models/Job');
const Application = require('../models/Application');

exports.getAllJobs = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; 
  try {
    const jobs = await Job.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const totalJobs = await Job.countDocuments();

    res.status(200).json({ jobs, totalJobs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createJob = async (req, res) => {
  const { companyName, position, contract, location, description } = req.body;

  try {
    const newJob = new Job({ companyName, position, contract, location, description });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.updateJob = async (req, res) => {
  const { id } = req.params;
  const { companyName, position, contract, location, description } = req.body;

  try {
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { companyName, position, contract, location, description },
      { new: true }
    );
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.deleteJob = async (req, res) => {
  const { id } = req.params;
  try {
    await Job.findByIdAndDelete(id);
    res.status(200).json({ message: 'Job deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAppliedJobsDetails = async (req, res) => {
  const { page = 1, limit = 12 } = req.query; 
  try {
    const applications = await Application.find()
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate('jobId')
      .populate('userId');

    const totalApplications = await Application.countDocuments();
    const appliedJobsDetails = applications.map(application => ({
      jobId: application.jobId._id,
      companyName: application.jobId.companyName,
      location: application.jobId.location,
      contract: application.jobId.contract,
      userId: application.userId._id,
      userName: application.userId.fullName,
      userEmail: application.userId.email,
      status: 'Applied'
    }));

    res.json({ appliedJobsDetails, totalApplications });
  } catch (error) {
    console.log('getAppliedJobs error: ', error);
    res.status(500).json({ message: error.message });
  }
};


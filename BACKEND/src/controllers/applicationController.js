const Job = require('../models/Job');
const Application = require('../models/Application');

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.applyForJob = async (req, res) => {
  const { jobId } = req.body;

  if (!jobId) {
    return res.status(400).json({ message: 'Job ID is required' });
  }

  try {
    const userId = req.user.userId;

    const existingApplication = await Application.findOne({ jobId, userId });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied to this job' });
    }

    const application = new Application({
      jobId,
      userId,
    });

    await application.save();
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


exports.getAppliedJobs = async (req, res) => {
  try {
    const userId = req.user.userId;

    const applications = await Application.find({ userId }).populate('jobId');

    const appliedJobs = applications.map(application => ({
      id: application.jobId._id,
      companyName: application.jobId.companyName,
      location: application.jobId.location,
      contract: application.jobId.contract,
      status: 'Applied'
    }));

    res.json(appliedJobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
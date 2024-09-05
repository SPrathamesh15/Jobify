import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchJob, updateJob } from '../../features/admin/actions';

function EditJob() {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const job = useSelector((state) => state.admin.job);
  const [formData, setFormData] = useState({
    companyName: '',
    position: '',
    contract: 'full-time', // Default value
    location: '',
  });

  useEffect(() => {
    dispatch(fetchJob(jobId)); // Fetch job details
  }, [dispatch, jobId]);

  useEffect(() => {
    if (job) {
      setFormData({
        companyName: job.companyName,
        position: job.position,
        contract: job.contract,
        location: job.location,
      });
    }
  }, [job]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateJob(jobId, formData)).then(() => {
      navigate('/admin/jobs-listing'); 
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Job</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Position</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Contract</label>
          <select
            name="contract"
            value={formData.contract}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditJob;

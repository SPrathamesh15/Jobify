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
    contract: 'full-time', 
    location: '',
    description: '',  
  });

  useEffect(() => {
    dispatch(fetchJob(jobId)); 
  }, [dispatch, jobId]);

  useEffect(() => {
    if (job) {
      setFormData({
        companyName: job.companyName,
        position: job.position,
        contract: job.contract,
        location: job.location,
        description: job.description || '', 
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
    <div className="flex flex-col min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-light text-gray-900 mb-8">Edit Job</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded-3xl">
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Position</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Contract</label>
          <select
            name="contract"
            value={formData.contract}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditJob;

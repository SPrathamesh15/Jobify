import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postJob } from '../../features/admin/actions'; 
import { toast } from 'react-toastify';

function JobsForm() {
  const [form, setForm] = useState({
    companyName: '',
    position: '',
    contract: '',
    location: '',
    description: '', // Added description field
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(postJob(form));
      setForm({ companyName: '', position: '', contract: '', location: '', description: '' }); // Reset form
      toast.success('Job posted successfully!');
    } catch (error) {
      toast.error('Failed to post job. Please try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Post a New Job</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg border border-gray-200">
        {/* Company Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            required
            className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter company name"
          />
        </div>

        {/* Position */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Position</label>
          <input
            type="text"
            name="position"
            value={form.position}
            onChange={handleChange}
            required
            className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter job position"
          />
        </div>

        {/* Contract Type */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Contract</label>
          <select
            name="contract"
            value={form.contract}
            onChange={handleChange}
            required
            className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Contract</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
          </select>
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter job location"
          />
        </div>

        {/* Job Description */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
            placeholder="Enter job description"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Post Job
        </button>
      </form>
    </div>
  );
}

export default JobsForm;

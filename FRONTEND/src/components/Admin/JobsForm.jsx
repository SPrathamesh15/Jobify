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
    <div className="flex flex-col min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Post a New Job</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
        {/* Other input fields */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            required
            className="p-2 border rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Position</label>
          <input
            type="text"
            name="position"
            value={form.position}
            onChange={handleChange}
            required
            className="p-2 border rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Contract</label>
          <select
            name="contract"
            value={form.contract}
            onChange={handleChange}
            required
            className="p-2 border rounded-md w-full"
          >
            <option value="">Select Contract</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            className="p-2 border rounded-md w-full"
          />
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            className="p-2 border rounded-md w-full"
            rows="4"
            placeholder="Enter job description"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition-colors duration-300"
        >
          Post Job
        </button>
      </form>
    </div>
  );
}

export default JobsForm;

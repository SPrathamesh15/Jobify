import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs, deleteJob } from '../../features/admin/actions';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function JobsListing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jobs = useSelector((state) => state.admin.jobs || []);
  const error = useSelector((state) => state.admin.error);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const handleDelete = (jobId) => {
    setSelectedJobId(jobId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedJobId) {
      dispatch(deleteJob(selectedJobId)).then(() => {
        dispatch(fetchJobs());
        setIsModalOpen(false);
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (jobId) => {
    navigate(`/admin/jobs/edit/${jobId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Job Listings</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="p-4 border-b">Company Name</th>
            <th className="p-4 border-b">Position</th>
            <th className="p-4 border-b">Contract</th>
            <th className="p-4 border-b">Location</th>
            <th className="p-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-4 text-center">No jobs available</td>
            </tr>
          ) : (
            jobs.map((job) => (
              <tr key={job._id}>
                <td className="p-4 border-b">{job.companyName}</td>
                <td className="p-4 border-b">{job.position}</td>
                <td className="p-4 border-b">{job.contract}</td>
                <td className="p-4 border-b">{job.location}</td>
                <td className="p-4 border-b flex gap-2">
                  <button
                    onClick={() => handleEdit(job._id)}
                    className="bg-blue-500 text-white p-1 rounded-md hover:bg-blue-600 flex items-center"
                  >
                    <FaEdit className="mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="bg-red-500 text-white p-1 rounded-md hover:bg-red-600 flex items-center"
                  >
                    <FaTrashAlt className="mr-2" />
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center transform transition-transform duration-300 ease-in-out max-w-sm mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Confirm Deletion</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this job? This action cannot be undone.</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transform hover:scale-105 transition-transform duration-200"
              >
                Delete
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transform hover:scale-105 transition-transform duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobsListing;

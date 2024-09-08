import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs, deleteJob } from '../../features/admin/actions';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function JobsListing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobs = [], totalJobs = 0 } = useSelector((state) => state.admin);
  const error = useSelector((state) => state.admin.error);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(10);

  useEffect(() => {
    dispatch(fetchJobs(currentPage, jobsPerPage));
  }, [dispatch, currentPage, jobsPerPage]);

  const handleDelete = (jobId) => {
    setSelectedJobId(jobId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedJobId) {
      dispatch(deleteJob(selectedJobId)).then(() => {
        dispatch(fetchJobs(currentPage, jobsPerPage));
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  const truncateDescription = (text, length = 30) => {
    if (text.length <= length) return text;
    return `${text.slice(0, length)}...`;
  };

  const renderPagination = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i <= 10 || (i >= totalPages - 4 && i <= totalPages)) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-4 py-2 border rounded-md mx-1 ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
          >
            {i}
          </button>
        );
      }
    }
    return buttons;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Job Listings</h1>
      {error && <p className="text-red-600 mb-6 text-lg font-medium">{error}</p>}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-lg rounded-lg border border-gray-200">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
            <tr>
              <th className="p-4 border-b">Company Name</th>
              <th className="p-4 border-b">Position</th>
              <th className="p-4 border-b">Contract</th>
              <th className="p-4 border-b">Location</th>
              <th className="p-4 border-b">Description</th>
              <th className="p-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">No jobs available</td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr key={job._id} className="hover:bg-gray-50">
                  <td className="p-4 border-b">{job.companyName}</td>
                  <td className="p-4 border-b">{job.position}</td>
                  <td className="p-4 border-b">{job.contract}</td>
                  <td className="p-4 border-b">{job.location}</td>
                  <td className="p-4 border-b">{truncateDescription(job.description, 30)}</td>
                  <td className="p-4 border-b flex justify-center space-x-2">
                    <button
                      onClick={() => handleEdit(job._id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 flex items-center"
                    >
                      <FaEdit className="mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 flex items-center"
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
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {renderPagination()}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition-transform duration-300 ease-in-out max-w-sm mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Confirm Deletion</h2>
            <p className="text-gray-700 mb-6">Are you sure you want to delete this job? This action cannot be undone.</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-transform duration-200"
              >
                Delete
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition-transform duration-200"
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

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
            className={`px-4 py-2 rounded-full mx-1 ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-gray-200'}`}
          >
            {i}
          </button>
        );
      }
    }
    return buttons;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-light text-gray-900 mb-8">Job Listings</h1>
      {error && <p className="text-red-600 mb-6 text-lg font-medium">{error}</p>}

      {/* Table */}
      <div className="overflow-x-auto rounded-3xl bg-white shadow-md">
        <table className="w-full bg-white text-left border-separate" style={{ borderSpacing: '0 10px' }}>
          <thead className="text-gray-600 text-sm font-light">
            <tr>
              <th className="py-4 px-6">Company</th>
              <th className="py-4 px-6">Position</th>
              <th className="py-4 px-6">Contract</th>
              <th className="py-4 px-6">Location</th>
              <th className="py-4 px-6">Description</th>
              <th className="py-4 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm">
            {jobs.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">No jobs available</td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr key={job._id} className="bg-gray-50 rounded-lg hover:bg-gray-100">
                  <td className="py-4 px-6">{job.companyName}</td>
                  <td className="py-4 px-6">{job.position}</td>
                  <td className="py-4 px-6">{job.contract}</td>
                  <td className="py-4 px-6">{job.location}</td>
                  <td className="py-4 px-6">{truncateDescription(job.description)}</td>
                  <td className="py-4 px-6 flex justify-center space-x-4">
                    <button
                      onClick={() => handleEdit(job._id)}
                      className="px-3 py-2 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 shadow-md flex items-center"
                    >
                      <FaEdit className="mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="px-3 py-2 rounded-full bg-red-50 text-red-500 hover:bg-red-100 shadow-md flex items-center"
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
      <div className="flex justify-center mt-8">
        {renderPagination()}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg mx-auto">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="text-gray-700 mb-6">Are you sure you want to delete this job? This action cannot be undone.</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-400"
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

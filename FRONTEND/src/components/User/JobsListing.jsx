import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs, applyJob } from '../../features/user/actions'; 
import { selectJobs } from '../../selectors/jobSelectors'; 
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
const dummyImage = 'https://via.placeholder.com/150'; 

function JobsListing() {
  const dispatch = useDispatch();
  const jobs = useSelector(selectJobs); 
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [contract, setContract] = useState('');
  const [selectedJob, setSelectedJob] = useState(null); 
  const modalRef = useRef(); 

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const handleApply = (jobId) => {
    dispatch(applyJob(jobId))
      .then(() => {
        toast.success('Successfully applied for the job!'); 
        dispatch(fetchJobs());  
      })
      .catch(() => {
        toast.error('Error applying for the job!'); 
      });
  };

  const handleJobClick = (job) => {
    setSelectedJob(job); 
  };

  const handleCloseModal = () => {
    setSelectedJob(null); 
  };

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    if (selectedJob) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [selectedJob]);

  const filteredJobs = jobs.filter((job) =>
    job.companyName.toLowerCase().includes(search.toLowerCase()) &&
    job.location.toLowerCase().includes(location.toLowerCase()) &&
    (contract ? job.contract === contract : true)
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Job Listings</h1>
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by company name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded-md w-full"
        />
        <input
          type="text"
          placeholder="Filter by location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-2 border rounded-md w-full"
        />
        <select
          value={contract}
          onChange={(e) => setContract(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">Filter by contract</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.length === 0 ? (
          <p className="text-gray-600">No jobs available</p>
        ) : (
          filteredJobs.map((job) => (
            <div key={job._id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src={dummyImage} alt={job.companyName} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{job.companyName}</h2>
                <p className="text-gray-600">{job.location}</p>
                <p className="text-gray-800 mt-2">Contract: {job.contract}</p>
                <button
                  onClick={() => handleJobClick(job)} 
                  className="w-full text-white p-2 rounded-md mt-4 bg-blue-500 hover:bg-blue-600 transition-colors duration-300"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleApply(job._id)}
                  className="w-full text-white p-2 rounded-md mt-4 bg-green-500 hover:bg-green-600 transition-colors duration-300"
                >
                  Apply
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div ref={modalRef} className="bg-white rounded-lg p-6 w-full max-w-md">
            <button
              onClick={handleCloseModal}
              className="text-gray-500 hover:text-gray-800 float-right"
            >
              ✖
            </button>
            <img src={dummyImage} alt={selectedJob.companyName} className="w-full h-40 object-cover mb-4" />
            <h2 className="text-2xl font-bold mb-2">{selectedJob.companyName}</h2>
            <p className="text-gray-600 mb-4">{selectedJob.location}</p>
            <p className="text-gray-800 mb-4">Contract: {selectedJob.contract}</p>
            <div className="text-gray-700 mb-4 h-40 overflow-y-scroll">
              <p>Description: {selectedJob.description}</p>
            </div>
            <button
              onClick={() => handleApply(selectedJob._id)}
              className="w-full text-white p-2 rounded-md mt-4 bg-green-500 hover:bg-green-600 transition-colors duration-300"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobsListing;

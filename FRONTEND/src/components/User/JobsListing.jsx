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
    <div className="flex flex-col min-h-screen bg-white text-gray-900 p-8">
      <h1 className="text-5xl font-semibold mb-10 text-center">Explore Opportunities</h1>
      <div className="flex flex-col md:flex-row gap-6 mb-12 justify-center">
        <input
          type="text"
          placeholder="Search by company"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-4 border border-gray-200 rounded-xl w-full md:w-1/3 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all shadow-sm"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-4 border border-gray-200 rounded-xl w-full md:w-1/3 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all shadow-sm"
        />
        <select
          value={contract}
          onChange={(e) => setContract(e.target.value)}
          className="p-4 border border-gray-200 rounded-xl w-full md:w-1/3 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all shadow-sm"
        >
          <option value="">Contract Type</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredJobs.length === 0 ? (
          <p className="text-gray-600 text-center">No job postings found</p>
        ) : (
          filteredJobs.map((job) => (
            <div key={job._id} className="bg-gray-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img src={dummyImage} alt={job.companyName} className="w-full h-48 object-cover rounded-t-2xl" />
              <div className="p-6">
                <h2 className="text-xl font-medium mb-2">{job.companyName}</h2>
                <p className="text-gray-500 mb-4">{job.location}</p>
                <p className="text-gray-700">Contract: {job.contract}</p>
                <button
                  onClick={() => handleJobClick(job)}
                  className="mt-4 w-full text-black p-3 rounded-xl bg-gray-200 hover:bg-gray-300 transition-all"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleApply(job._id)}
                  className="mt-4 w-full text-white p-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div ref={modalRef} className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-xl relative transition-all">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              &times;
            </button>
            <img src={dummyImage} alt={selectedJob.companyName} className="w-full h-48 object-cover mb-6 rounded-xl" />
            <h2 className="text-2xl font-semibold mb-2">{selectedJob.companyName}</h2>
            <p className="text-gray-600 mb-4">{selectedJob.location}</p>
            <p className="text-gray-700 mb-4">Contract: {selectedJob.contract}</p>
            <div className="text-gray-600 mb-4 h-40 overflow-y-auto">
              <p>{selectedJob.description}</p>
            </div>
            <button
              onClick={() => handleApply(selectedJob._id)}
              className="w-full text-white p-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all"
            >
              Apply Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobsListing;

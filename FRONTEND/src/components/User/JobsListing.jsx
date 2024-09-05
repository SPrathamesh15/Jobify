import React, { useEffect, useState } from 'react';
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
  const [appliedJobs, setAppliedJobs] = useState([]); 

  useEffect(() => {
    // Fetch jobs on component mount
    dispatch(fetchJobs());

    // Retrieve applied jobs from localStorage on component mount
    const storedAppliedJobs = JSON.parse(localStorage.getItem('appliedJobs')) || [];
    setAppliedJobs(storedAppliedJobs);
  }, [dispatch]);

  const handleApply = (jobId) => {
    dispatch(applyJob(jobId))
      .then(() => {
        const updatedAppliedJobs = [...appliedJobs, jobId];
        setAppliedJobs(updatedAppliedJobs);

        // Save applied jobs to localStorage
        localStorage.setItem('appliedJobs', JSON.stringify(updatedAppliedJobs));

        toast.success('Successfully applied for the job!'); 
      })
      .catch(() => {
        toast.error('Error applying for the job!'); 
      });
  };

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
                  onClick={() => handleApply(job._id)}
                  disabled={appliedJobs.includes(job._id)} // Disable button if applied
                  className={`w-full text-white p-2 rounded-md mt-4 transition-colors duration-300 ${
                    appliedJobs.includes(job._id)
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {appliedJobs.includes(job._id) ? 'Applied' : 'Apply'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default JobsListing;

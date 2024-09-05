import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppliedJobs } from '../../features/user/actions';
import { selectAppliedJobs } from '../../selectors/jobSelectors'; 

const AppliedJobs = () => {
  const dispatch = useDispatch();
  const appliedJobs = useSelector(selectAppliedJobs);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    dispatch(fetchAppliedJobs());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Applied Jobs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appliedJobs.length === 0 ? (
          <p className="text-gray-600">No jobs applied</p>
        ) : (
          appliedJobs.map((job) => (
            <div key={job.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-4">
                <h2 className="text-xl font-semibold">{job.companyName}</h2>
                <p className="text-gray-600">{job.location}</p>
                <p className="text-gray-800 mt-2">Contract: {job.contract}</p>
                <p className="text-gray-800 mt-2">Status: <span className='text-blue-500 font-bold'>{job.status}</span></p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AppliedJobs;

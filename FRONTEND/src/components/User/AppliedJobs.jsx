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

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 p-8">
      <h1 className="text-4xl font-semibold mb-10 text-center">Your Applied Jobs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {appliedJobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs applied yet.</p>
        ) : (
          appliedJobs.map((job) => (
            <div key={job.id} className="bg-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6">
              <h2 className="text-xl font-medium mb-2 text-gray-900">{job.companyName}</h2>
              <p className="text-gray-500 mb-2">{job.location}</p>
              <p className="text-gray-700 mb-2">Contract: {job.contract}</p>
              <p className="text-gray-700 mb-2">
                Status: <span className="text-blue-600 font-semibold">{job.status}</span>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AppliedJobs;

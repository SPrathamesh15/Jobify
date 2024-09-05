import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppliedJobsDetails } from '../../features/admin/actions';
import { selectAppliedJobsDetails } from '../../selectors/adminSelectors'; 

function AppliedJobsDetails() {
  const dispatch = useDispatch();
  const appliedJobsDetails = useSelector(selectAppliedJobsDetails);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchAppliedJobsDetails())
      .finally(() => setLoading(false));
  }, [dispatch]);
  console.log('appliedjob', appliedJobsDetails); 
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Applied Jobs Details</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appliedJobsDetails.length === 0 ? (
            <p className="text-gray-600">No applications available</p>
          ) : (
            appliedJobsDetails.map((detail) => (
              <div key={detail.jobId} className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{detail.companyName}</h2>
                  <p className="text-gray-600">{detail.location}</p>
                  <p className="text-gray-800 mt-2">Contract: {detail.contract}</p>
                  <p className="text-gray-800 mt-2">Applied By: {detail.userName}</p>
                  <p className="text-gray-800 mt-2">Email: {detail.userEmail}</p>
                  <p className="text-gray-800 mt-2">Status: <span className='text-blue-500 font-bold'>{detail.status}</span></p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default AppliedJobsDetails;

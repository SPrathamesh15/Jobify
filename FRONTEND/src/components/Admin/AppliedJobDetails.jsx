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

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="bg-white shadow-md py-6 px-8 mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Applied Jobs Details</h1>
        <p className="text-gray-600 mt-2">Track your job applications and their statuses</p>
      </div>

      {/* Content */}
      <div className="p-6">
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {appliedJobsDetails.length === 0 ? (
              <div className="col-span-full text-center">
                <p className="text-gray-600 text-lg">No job applications available.</p>
              </div>
            ) : (
              appliedJobsDetails.map((detail) => (
                <div
                  key={detail.jobId}
                  className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
                >
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold text-gray-800">{detail.companyName}</h2>
                    <p className="text-gray-500 mt-1">{detail.location}</p>
                    
                    <div className="mt-4">
                      <p className="text-gray-700 font-medium">Contract: <span className="font-normal">{detail.contract}</span></p>
                      <p className="text-gray-700 font-medium mt-1">Applied By: <span className="font-normal">{detail.userName}</span></p>
                      <p className="text-gray-700 font-medium mt-1">Email: <span className="font-normal">{detail.userEmail}</span></p>
                    </div>

                    {/* Status Badge */}
                    <div className="mt-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          detail.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-600'
                            : detail.status === 'Approved'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {detail.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AppliedJobsDetails;

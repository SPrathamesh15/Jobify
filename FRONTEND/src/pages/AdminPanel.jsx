import React, { useEffect } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import JobsForm from '../components/Admin/JobsForm';
import JobsListing from '../components/Admin/JobsListing';
import EditJob from '../components/Admin/EditJob';
import AppliedJobsDetails from '../components/Admin/AppliedJobDetails'; 
import { checkAuthStatus } from '../features/auth/actions';
import { selectAuth } from '../selectors/authSelectors';
import { useDispatch, useSelector } from 'react-redux';

function AdminPanel() {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Side Panel */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        <ul>
          <li>
            <NavLink
              to="jobs-form"
              className={({ isActive }) =>
                `block w-full text-left p-2 rounded-md ${
                  isActive ? 'bg-gray-600' : 'hover:bg-gray-700'
                }`
              }
            >
              Post Job
            </NavLink>
          </li>
          <li>
            <NavLink
              to="jobs-listing"
              className={({ isActive }) =>
                `block w-full text-left p-2 rounded-md ${
                  isActive ? 'bg-gray-600' : 'hover:bg-gray-700'
                }`
              }
            >
              Job Listings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="applied-jobs-details"
              className={({ isActive }) =>
                `block w-full text-left p-2 rounded-md ${
                  isActive ? 'bg-gray-600' : 'hover:bg-gray-700'
                }`
              }
            >
              Applied Jobs Details
            </NavLink>
          </li>
        </ul>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-6">
        <Routes>
          <Route path="jobs-form" element={<JobsForm />} />
          <Route path="jobs-listing" element={<JobsListing />} />
          <Route path="jobs/edit/:jobId" element={<EditJob />} />
          <Route path="applied-jobs-details" element={<AppliedJobsDetails />} /> 
        </Routes>
      </main>
    </div>
  );
}

export default AdminPanel;

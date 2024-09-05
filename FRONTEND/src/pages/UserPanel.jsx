import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../features/user/actions';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import JobsListing from '../components/User/JobsListing';
import AppliedJobs from '../components/User/AppliedJobs';
import { selectAuth } from '../selectors/authSelectors';
import { checkAuthStatus } from '../features/auth/actions';

function UserPanel() {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const navigate = useNavigate();
  
  const [showGreeting, setShowGreeting] = useState(true);


  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchJobs());
    
    const timer = setTimeout(() => {
      setShowGreeting(false);
    }, 5000); 

    return () => clearTimeout(timer);
  }, [auth.isAuthenticated, dispatch, navigate]);
  console.log('atu', auth)
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Side Panel */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h1 className="text-2xl font-bold mb-6">User Panel</h1>
        <ul>
          <li>
            <NavLink
              to="job-listings"
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
              to="applied-jobs"
              className={({ isActive }) =>
                `block w-full text-left p-2 rounded-md ${
                  isActive ? 'bg-gray-600' : 'hover:bg-gray-700'
                }`
              }
            >
              Applied Jobs
            </NavLink>
          </li>
        </ul>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-6">
        {showGreeting && (
          <div className="bg-blue-500 text-white p-4 mb-6 rounded-md">
            <h2 className="text-xl font-bold">
              Hello, {auth.user?.fullName || 'User'}! Welcome to your panel.
            </h2>
          </div>
        )}
        
        <Routes>
          <Route path="job-listings" element={<JobsListing />} />
          <Route path="applied-jobs" element={<AppliedJobs />} />
        </Routes>
      </main>
    </div>
  );
}

export default UserPanel;

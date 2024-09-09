import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../features/user/actions';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import JobsListing from '../components/User/JobsListing';
import AppliedJobs from '../components/User/AppliedJobs';
import { selectAuth } from '../selectors/authSelectors';
import { checkAuthStatus } from '../features/auth/actions';
import { FiMenu } from 'react-icons/fi'; 
import { IoClose } from 'react-icons/io5'; 

function UserPanel() {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const navigate = useNavigate();

  const [showGreeting, setShowGreeting] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const sidebarRef = useRef(null); 

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="flex min-h-screen bg-white">

      <button
        className="absolute top-4 left-4 text-2xl text-gray-800 md:hidden"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <IoClose /> : <FiMenu />}
      </button>

      <aside
        ref={sidebarRef}
        className={`w-64 bg-gray-100 text-gray-900 p-6 h-full fixed z-10 transform md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:h-screen border-r border-gray-200`}
      >
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <ul className="space-y-4">
          <li>
            <NavLink
              to="job-listings"
              className={({ isActive }) =>
                `block w-full text-left p-3 rounded-lg transition ${
                  isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                }`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              Job Listings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="applied-jobs"
              className={({ isActive }) =>
                `block w-full text-left p-3 rounded-lg transition ${
                  isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                }`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              Applied Jobs
            </NavLink>
          </li>
        </ul>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-0 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <main className="flex-1 p-8 ml-0 md:ml-64 bg-gray-50">
        {showGreeting && (
          <div className="bg-blue-100 text-blue-800 p-4 mb-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold">
              Hello, {auth.user?.fullName || 'User'}! Welcome back to your panel.
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

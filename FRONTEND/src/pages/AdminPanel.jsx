import React, { useEffect, useState, useRef } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import JobsForm from '../components/Admin/JobsForm';
import JobsListing from '../components/Admin/JobsListing';
import EditJob from '../components/Admin/EditJob';
import AppliedJobsDetails from '../components/Admin/AppliedJobDetails';
import { checkAuthStatus } from '../features/auth/actions';
import { selectAuth } from '../selectors/authSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { FiMenu } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';

function AdminPanel() {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const sidebarRef = useRef(null); 
  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

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
    <div className="flex min-h-screen bg-gray-100">

      <button
        className="absolute top-4 left-4 text-2xl md:hidden"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <IoClose /> : <FiMenu />}
      </button>

      {/* Side Panel */}
      <aside
        ref={sidebarRef}
        className={`w-64 bg-gray-800 text-white p-6 h-full fixed z-10 transform md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:h-screen`}
      >
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
              onClick={() => setIsSidebarOpen(false)} 
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
              onClick={() => setIsSidebarOpen(false)}
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
              onClick={() => setIsSidebarOpen(false)}
            >
              Applied Jobs Details
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

      <main className="flex-1 p-6 ml-0 md:ml-64">
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

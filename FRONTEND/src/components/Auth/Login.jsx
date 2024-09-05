import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/auth/actions'; 
import { toast } from 'react-toastify';
import LoginImg from '../../assets/images/signupimg.png'; 
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.error) {
      toast.error(auth.error);
    }
    if (auth.user) {
      toast.success('You have successfully logged in!');
      if (auth.user.isAdmin) {
        navigate('/admin'); 
      } else {
        navigate('/user'); 
      }
    }
  }, [auth.error, auth.user]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-r from-teal-400 to-blue-500 justify-center items-center">
        <img
          src={LoginImg}
          alt="Login Visual"
          className="h-5/6 rounded-xl transform hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="flex w-full lg:w-1/2 justify-center items-center bg-white p-10">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login to Your Account</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center bg-gray-100 rounded-md p-2">
              <FaEnvelope className="text-gray-500 mr-3" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="bg-transparent flex-1 outline-none"
              />
            </div>
            <div className="flex items-center bg-gray-100 rounded-md p-2 relative">
              <FaLock className="text-gray-500 mr-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="bg-transparent flex-1 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600">
                {showPassword ? <HiEye /> : <HiEyeOff />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition-colors duration-300">
              Login
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            Don't have an account? <a onClick={() => navigate('/signup')}  className="text-teal-500 font-bold hover:underline cursor-pointer">Sign up here</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

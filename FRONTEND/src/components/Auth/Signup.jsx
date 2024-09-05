import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaKey } from 'react-icons/fa';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, verifyOtpAndSignup, resendOtp } from '../../features/auth/actions';
import { toast } from 'react-toastify';
import SignupImg from '../../assets/images/signupimg.png';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmpassword: '',
    otp: '',
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isResendingOtp, setIsResendingOtp] = useState(false);
  const [timer, setTimer] = useState(10);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.error) {
      toast.error(auth.error);
      setIsSendingOtp(false);
      setIsResendingOtp(false);
    }

    if (auth.otpSent && !auth.otpResent) {
      toast.success('OTP sent successfully!');
      setIsSendingOtp(false);
      setShowOtpInput(true);
      setTimer(10);
    }

    if (auth.otpResent) {
      toast.success('OTP resent successfully!');
      setIsResendingOtp(false);
      setTimer(10);
    }

    if (auth.user) {
      toast.success('You have successfully signed up!');
      resetForm();
      navigate(auth.user.isAdmin ? '/admin' : '/user');
    }
  }, [auth, navigate]);

  useEffect(() => {
    let interval;
    if (showOtpInput && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [showOtpInput, timer]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmpassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (showOtpInput) {
      dispatch(verifyOtpAndSignup(form));
    } else {
      setIsSendingOtp(true);
      dispatch(sendOtp(form.email));
    }
  };

  const handleResendOtp = () => {
    if (!isResendingOtp && timer === 0) {
      setIsResendingOtp(true);
      dispatch(resendOtp(form.email))
        .catch(() => {
          setIsResendingOtp(false);
          toast.error('Failed to resend OTP, please try again later.');
        });
    }
  };

  const resetForm = () => {
    setForm({
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmpassword: '',
      otp: '',
    });
    setShowOtpInput(false);
    setTimer(10);
  };

  const passwordStrength = form.password.length > 6 ? 3 : form.password.length > 4 ? 2 : 1;
  const passwordSuggestions = form.password.length > 6 ? [] : ['Password should be at least 6 characters long'];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-r from-teal-400 to-blue-500 justify-center items-center">
        <img
          src={SignupImg}
          alt="Signup Visual"
          className="h-5/6 rounded-xl transform hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="flex w-full lg:w-1/2 justify-center items-center bg-white p-10">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center bg-gray-100 rounded-md p-2">
              <FaUser className="text-gray-500 mr-3" />
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="bg-transparent flex-1 outline-none"
              />
            </div>
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
            <div className="flex items-center bg-gray-100 rounded-md p-2">
              <FaPhone className="text-gray-500 mr-3" />
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                pattern="\d{10}"
                maxLength="10"
                placeholder="Phone Number"
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
            {form.password && (
              <div className="mt-2">
                <div
                  className={`h-2 rounded ${passwordStrength >= 3 ? 'bg-green-500' : passwordStrength === 2 ? 'bg-yellow-400' : 'bg-red-500'}`}
                  style={{ width: `${(passwordStrength + 1) * 20}%` }}
                ></div>
                {passwordSuggestions.length > 0 && (
                  <ul className="mt-1 text-sm text-red-600">
                    {passwordSuggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            <div className="flex items-center bg-gray-100 rounded-md p-2 relative">
              <FaLock className="text-gray-500 mr-3" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmpassword"
                value={form.confirmpassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
                className="bg-transparent flex-1 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600">
                {showConfirmPassword ? <HiEye /> : <HiEyeOff />}
              </button>
            </div>

            {showOtpInput && (
              <>
                <div className="flex items-center bg-gray-100 rounded-md p-2">
                  <FaKey className="text-gray-500 mr-3" />
                  <input
                    type="text"
                    name="otp"
                    value={form.otp}
                    onChange={handleChange}
                    placeholder="Enter OTP"
                    className="bg-transparent flex-1 outline-none"
                  />
                </div>
                <button
                  type="button"
                  disabled={isResendingOtp || timer > 0}
                  onClick={handleResendOtp}
                  className={`w-full bg-blue-500 text-white p-2 rounded-md transition-colors duration-300 ${
                    timer > 0 ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-blue-600'
                  }`}>
                  {isResendingOtp ? 'Resending OTP...' : 'Resend OTP'}
                </button>
                {timer > 0 && (
                  <p className="text-gray-500 text-center mt-2">
                    Resend available in <span className="font-bold">{timer}</span> seconds
                  </p>
                )}
                <p className='text-red-500 font-semibold'>
                  Note: For testing purposes, OTP verification is currently disabled. In a production environment, OTP verification is mandatory for successful registration.
                </p>
              </>
            )}

            <button
              type="submit"
              className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition-colors duration-300">
              {isSendingOtp ? 'Sending OTP...' : showOtpInput ? 'Verify OTP & Signup' : 'Send OTP'}
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            Already have an account? <a onClick={() => navigate('/login')} className="text-teal-500 font-bold hover:underline cursor-pointer">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;

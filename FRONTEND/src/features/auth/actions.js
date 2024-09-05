import axios from '../../config/axiosConfig';
import { REGISTER_SUCCESS, REGISTER_FAIL, SEND_OTP, VERIFY_OTP, RESEND_OTP, LOGIN_SUCCESS, LOGIN_FAIL } from './types';

export const sendOtp = (email) => async (dispatch) => {
  try {
    await axios.post('/send-otp', { email });
    dispatch({ type: SEND_OTP });
  } catch (error) {
    dispatch({ type: REGISTER_FAIL, payload: error.response.data.message });
  }
};
export const resendOtp = (email) => async (dispatch) => {
  try {
    await axios.post('/resend-otp', { email });
    dispatch({ type: RESEND_OTP });
  } catch (error) {
    dispatch({ type: REGISTER_FAIL, payload: error.response.data.message });
  }
};
export const verifyOtpAndSignup = (formData) => async (dispatch) => {
  try {
    const response = await axios.post('/verify-otp-and-signup', formData);
    dispatch({ type: REGISTER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: REGISTER_FAIL, payload: error.response.data.message });
  }
};

export const login = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post('/login', credentials);
    dispatch({ type: LOGIN_SUCCESS, payload: response.data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const checkAuthStatus = () => async (dispatch) => {
  try {
    const response = await axios.get('/auth-status');
    dispatch({ type: LOGIN_SUCCESS, payload: response.data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: 'Not authenticated' });
  }
};
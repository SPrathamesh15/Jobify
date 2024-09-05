import { REGISTER_SUCCESS, REGISTER_FAIL, SEND_OTP, VERIFY_OTP, RESEND_OTP, LOGIN_SUCCESS, LOGIN_FAIL } from './types';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
  otpSent: false,
  otpResent: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return { ...state, user: action.payload, isAuthenticated: true, loading: false };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return { ...state, error: action.payload, isAuthenticated: false, loading: false };
    case SEND_OTP:
      return { ...state, otpSent: true };
    case RESEND_OTP:
      return { ...state, otpResent: true };
    case VERIFY_OTP:
      return { ...state, otpSent: false };
    default:
      return state;
  }
};

export default authReducer;

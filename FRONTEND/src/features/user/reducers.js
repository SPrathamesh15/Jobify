import { FETCH_JOBS, JOBS_ERROR, APPLY_JOB, FETCH_APPLIED_JOBS, APPLIED_JOBS_ERROR } from './types';

const initialState = {
  jobs: [], // Store fetched jobs here
  error: null,
  appliedJobs: [], // Store applied job ids here
};

const userjobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOBS:
      return {
        ...state,
        jobs: action.payload, // Update state with the fetched jobs
      };
    case APPLY_JOB:
      return {
        ...state,
        appliedJobs: [...state.appliedJobs, action.payload], // Add applied job ID
      };
    case JOBS_ERROR:
      return {
        ...state,
        error: action.payload, // Store error messages
      };
      case FETCH_APPLIED_JOBS:
      return {
        ...state,
        appliedJobs: action.payload,
        loading: false
      };
    case APPLIED_JOBS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default userjobsReducer;

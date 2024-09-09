import {
  POST_JOB,
  FETCH_JOBS,
  FETCH_JOB,
  DELETE_JOB,
  UPDATE_JOB,
  JOBS_ERROR,
  FETCH_APPLIED_JOBS_DETAILS
} from './types';

const initialState = {
  jobs: [],
  job: null, 
  error: null,
  totalJobs: 0,
  appliedJobsDetails: [],
  totalApplications: 0, // Add this to keep track of total applications for pagination
};

export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_APPLIED_JOBS_DETAILS:
      return {
        ...state,
        appliedJobsDetails: action.payload.appliedJobsDetails || [],
        totalApplications: action.payload.totalApplications || 0,
      };
    case POST_JOB:
      return {
        ...state,
        jobs: [...state.jobs, action.payload],
      };
    case FETCH_JOBS:
      return {
        ...state,
        jobs: action.payload.jobs || [], 
        totalJobs: action.payload.totalJobs || 0,
      };
    case FETCH_JOB:
      return {
        ...state,
        job: action.payload,
      };
    case DELETE_JOB:
      return {
        ...state,
        jobs: state.jobs.filter((job) => job._id !== action.payload),
      };
    case UPDATE_JOB:
      return {
        ...state,
        jobs: state.jobs.map((job) =>
          job._id === action.payload._id ? action.payload : job
        ),
        job: action.payload,
      };
    case JOBS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

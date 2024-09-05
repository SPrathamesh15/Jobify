import axios from '../../config/axiosConfig';
import { FETCH_JOBS, APPLY_JOB, JOBS_ERROR, FETCH_APPLIED_JOBS, APPLIED_JOBS_ERROR } from './types';

export const fetchJobs = () => async (dispatch) => {
  try {
    const response = await axios.get('/user-jobs');
    dispatch({ type: FETCH_JOBS, payload: response.data });
  } catch (error) {
    dispatch({ type: JOBS_ERROR, payload: error.response.data.message });
  }
};

export const applyJob = (jobId) => async (dispatch) => {
  try {
    await axios.post('/apply-job', { jobId });
    dispatch({ type: APPLY_JOB, payload: jobId });
  } catch (error) {
    dispatch({ type: JOBS_ERROR, payload: error.response.data.message });
  }
};

export const fetchAppliedJobs = () => async (dispatch) => {
  try {
    const response = await axios.get('/applied-jobs');
    dispatch({ type: FETCH_APPLIED_JOBS, payload: response.data });
  } catch (error) {
    dispatch({ type: APPLIED_JOBS_ERROR, payload: error.response.data.message });
  }
};
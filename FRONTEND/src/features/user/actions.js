import axios from '../../config/axiosConfig';
import { FETCH_JOBS, APPLY_JOB, JOBS_ERROR, FETCH_APPLIED_JOBS, APPLIED_JOBS_ERROR } from './types';

const getAuthToken = () => localStorage.getItem('authToken');

export const fetchJobs = () => async (dispatch) => {
  try {
    const token = getAuthToken();
    const response = await axios.get('/user-jobs', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: FETCH_JOBS, payload: response.data });
  } catch (error) {
    dispatch({ type: JOBS_ERROR, payload: error.response?.data?.message || 'Error fetching jobs' });
  }
};

export const applyJob = (jobId) => async (dispatch) => {
  try {
    const token = getAuthToken();
    await axios.post(
      '/apply-job',
      { jobId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: APPLY_JOB, payload: jobId });
  } catch (error) {
    dispatch({ type: JOBS_ERROR, payload: error.response?.data?.message || 'Error applying for job' });
  }
};

export const fetchAppliedJobs = () => async (dispatch) => {
  try {
    const token = getAuthToken();
    const response = await axios.get('/applied-jobs', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: FETCH_APPLIED_JOBS, payload: response.data });
  } catch (error) {
    dispatch({ type: APPLIED_JOBS_ERROR, payload: error.response?.data?.message || 'Error fetching applied jobs' });
  }
};

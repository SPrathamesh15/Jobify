import axios from '../../config/axiosConfig';
import {
  POST_JOB,
  FETCH_JOBS,
  FETCH_JOB,
  DELETE_JOB,
  UPDATE_JOB,
  JOBS_ERROR,
  FETCH_APPLIED_JOBS_DETAILS
} from './types';

export const postJob = (jobData) => async (dispatch) => {
  try {
    const response = await axios.post('/admin/jobs', jobData);
    dispatch({ type: POST_JOB, payload: response.data });
  } catch (error) {
    dispatch({ type: JOBS_ERROR, payload: error.response?.data?.message || error.message });
  }
};

export const fetchJobs = (page = 1, limit = 10) => async (dispatch) => {
  try {
    const response = await axios.get('/admin/jobs', {
      params: {
        page,
        limit
      }
    });
    dispatch({ type: FETCH_JOBS, payload: response.data });
  } catch (error) {
    dispatch({ type: JOBS_ERROR, payload: error.response?.data?.message || error.message });
  }
};


export const fetchJob = (jobId) => async (dispatch) => {
  try {
    const response = await axios.get(`/admin/jobs/${jobId}`);
    dispatch({ type: FETCH_JOB, payload: response.data });
  } catch (error) {
    dispatch({ type: JOBS_ERROR, payload: error.response?.data?.message || error.message });
  }
};

export const deleteJob = (jobId) => async (dispatch) => {
  try {
    await axios.delete(`/admin/jobs/${jobId}`);
    dispatch({ type: DELETE_JOB, payload: jobId });
  } catch (error) {
    dispatch({ type: JOBS_ERROR, payload: error.response?.data?.message || error.message });
  }
};

export const updateJob = (jobId, updatedData) => async (dispatch) => {
  try {
    const response = await axios.put(`/admin/jobs/${jobId}`, updatedData); 
    dispatch({ type: UPDATE_JOB, payload: response.data });
  } catch (error) {
    dispatch({ type: JOBS_ERROR, payload: error.response?.data?.message || error.message });
  }
};


export const fetchAppliedJobsDetails = (page = 1, limit = 12) => async (dispatch) => {
  try {
    const response = await axios.get('/admin/applied-jobs', {
      params: {
        page,
        limit
      }
    });
    console.log('response', response)
    dispatch({ type: FETCH_APPLIED_JOBS_DETAILS, payload: response.data });
  } catch (error) {
    dispatch({ type: ADMIN_ERROR, payload: error.response.data.message });
  }
};

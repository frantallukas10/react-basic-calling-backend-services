import axios from 'axios';
import logger from './logService';
import { toast } from 'react-toastify';

// Unexpected errors (network down, server down, databases down,
// bug in our application code)
// - Log them
// - Display a generic and friendly error message
// console.log('Logging the error', ex);
// alert('An unexpected error occurred.');
// With this interceptor, we can handling unexpected errors globally.
axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    // console.log('Logging the error', error);
    logger.log(error);
    toast.error('An unexpected error occurrred.');
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};

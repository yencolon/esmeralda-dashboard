import axios from 'axios';

const apiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_EXTERNAL_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
}

const apiExternal = axios.create(apiConfig);

export default apiExternal;

import axios from 'axios';

const apiConfig = {
  baseURL: 'https://risa.vps.co.ve',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
}

const apiExternal = axios.create(apiConfig);

export default apiExternal;

import axios from 'axios';

const apiConfig = {
  baseURL: 'https://www.esmeraldaenlinea.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
}

const apiExternal = axios.create(apiConfig);

export default apiExternal;

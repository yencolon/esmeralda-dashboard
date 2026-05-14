import axios from 'axios';
import { mockAdapter } from './mock/adapter';

const useMock = process.env.USE_MOCK_API === 'true';

const apiExternal = axios.create({
  baseURL: useMock ? 'http://mock.local' : process.env.NEXT_PUBLIC_API_EXTERNAL_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  ...(useMock ? { adapter: mockAdapter } : {}),
});

export default apiExternal;

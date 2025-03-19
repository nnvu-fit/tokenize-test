import axios from 'axios';

export const axiosService = axios.create({
  baseURL: 'https://api.binance.com/',
  headers: {
    'Content-Type': 'application/json',
    'X-MBX-APIKEY': 'vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A'
  }
});
// Compare this snippet from src/api/services/axios.service.ts:

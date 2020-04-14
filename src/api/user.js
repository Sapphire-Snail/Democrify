import axios from 'axios';

export function getUser() {
  return axios.get('/api/me');
}

export function getUserTokens(code) {
  return axios({
    method: 'post',
    url: '/api/login',
    timeout: 8000,
    data: {
      code,
    },
  });
}

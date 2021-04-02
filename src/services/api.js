import axios from 'axios';

export default axios.create({
    baseURL: 'https://6064e7b6f091970017786cdc.mockapi.io/results',
    headers: { 'Content-Type': 'application/json' }
  });
  
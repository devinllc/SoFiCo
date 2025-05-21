// utils/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://so-fi-co.vercel.app', // Set your API base URL here
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;

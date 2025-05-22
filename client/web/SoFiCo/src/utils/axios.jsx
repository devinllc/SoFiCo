import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://so-fi-co.vercel.app'
});

export default instance;

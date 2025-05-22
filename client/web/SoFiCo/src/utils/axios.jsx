import axios from 'axios';

const api = axios.create({
  baseURL: 'https://scftest-inky.vercel.app'
});

export default api;

export const addUser = (user) => {
  return api.post("/user/create", user);
};

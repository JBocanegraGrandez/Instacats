import axios from "axios";

export const getUsers = () => {
  return axios.get('/api/users')
};

export const getUser = (username) => {
  return axios.get(`/api/users/${username}`);
};

export const updateUser = (userData) => {
  return axios.patch('/api/users/update', userData)
};

export const addFollower = (username) => {
  return axios.post(`/api/users/${username}/follow`);
}

export const removeFollower = (username) => {
  return axios.post(`/api/users/${username}/unfollow`);
}
import axios from 'axios';

export const writeComment = data => {
  return axios.post(`/api/comments/${data.postId}`, data);
};

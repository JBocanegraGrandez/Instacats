import axios from 'axios';

export const createComment = postId => {
  return axios.post(`api/comments/${postId}`);
};

import axios from 'axios';

export const writeComment = data => {
  return axios.post(`/api/comments/${data.postId}`, data);
};

export const likeComment = comment => {
  return axios.post(`/api/comments/${comment.postId}/${comment._id}/like`)
}

export const dislikeComment = comment => {
  return axios.post(`/api/comments/${comment.postId}/${comment._id}/dislike`)
}
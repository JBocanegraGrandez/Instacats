import axios from 'axios';

export const getPosts = () => {
    return axios.get('/api/posts')
};

export const getPost = id => {
    return axios.get(`/api/posts/${id}`)
}

export const getUserPosts = id => {
    return axios.get(`/api/posts/user/${id}`)
};

export const writePost = data => {
    return axios.post('/api/posts/', data)
}
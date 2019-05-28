import { getPosts, getUserPosts, writePost, likePost, dislikePost } from '../util/post_api_util';

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_USER_POSTS = "RECEIVE_USER_POSTS";
export const RECEIVE_NEW_POST = "RECEIVE_NEW_POST";

export const receivePosts = posts => ({
    type: RECEIVE_POSTS,
    posts
});

export const receiveUserPosts = posts => ({
    type: RECEIVE_USER_POSTS,
    posts
});

export const receiveNewPost = post => ({
    type: RECEIVE_NEW_POST,
    post
});

export const fetchPosts = () => dispatch => (
    getPosts()
        .then(posts => dispatch(receivePosts(posts)))
        .catch(err => console.log(err))
);

export const fetchUserPosts = id => dispatch => (
    getUserPosts(id)
        .then(posts => dispatch(receiveUserPosts(posts)))
        .catch(err => console.log(err))
);

export const composePost = data => dispatch => (
    writePost(data)
        .then(post => dispatch(receiveNewPost(post)))
        .catch(err => console.log(err))
);

export const addLikeToPost = id => dispatch => (
    likePost(id)
        .then((post) => getPosts()
            .then(posts => dispatch(receivePosts(posts)))
        )
)

export const removeLikeToPost = id => dispatch => (
    dislikePost(id)
        .then((post) => getPosts()
            .then(posts => dispatch(receivePosts(posts)))
        )
)
import { createComment } from '../util/comment_api_util';
import { getPosts } from '../util/post_api_util';
import { receivePosts } from './post_actions';

export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";

export const addCommentToPost = postId => dispatch => (
    createComment(postId)
        .then((post) => getPosts()
            .then(posts => dispatch(receivePosts(posts))) 
        )
)
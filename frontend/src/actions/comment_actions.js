import { writeComment } from '../util/comment_api_util';
import { getPosts } from '../util/post_api_util';
import { receivePost } from './post_actions';

export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";

export const makeNewComment = comment => ({
    type: RECEIVE_COMMENTS,
    comment
})

export const addCommentToPost = data => dispatch => (
    writeComment(data)
            .then(post => dispatch(receivePost(post))) 
)
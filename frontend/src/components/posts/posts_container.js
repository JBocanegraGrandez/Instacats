import { connect } from 'react-redux';
import { fetchPosts, addLikeToPost, removeLikeToPost} from '../../actions/post_actions';
import { fetchUsers } from '../../actions/user_actions';
import Post from './posts';
import {addCommentToPost } from '../../actions/comment_actions';

const mapStateToProps = (state) => {
    return {
        posts: Object.values(state.posts.all),
        currentUser: state.session.user,
        users: state.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPosts: () => dispatch(fetchPosts()),
        fetchUsers: () => dispatch(fetchUsers()),
        addLikeToPost: (id) => dispatch(addLikeToPost(id)),
        removeLikeToPost: (id) => dispatch(removeLikeToPost(id)),
        addCommentToPost: (comment) =>dispatch(addCommentToPost(comment))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post)
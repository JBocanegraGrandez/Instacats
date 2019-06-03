import { connect } from 'react-redux';
import { fetchPosts, addLikeToPost, removeLikeToPost } from '../../actions/post_actions';
import { fetchUsers } from '../../actions/user_actions';
import PostDisplay from './post_display';
import { addCommentToPost } from '../../actions/comment_actions';


function findPostbyId(state, postId) {
    return Object.values(state.posts.all).find((post) => {
        return post._id === postId
    })
}

const mapStateToProps = (state, ownProps) => {
    const defaultPost = {
      caption: "",
      user: "loading...",
      comments: [],
      likes: [],
    };

    const foundPost = findPostbyId(state, ownProps.match.params.postId);
    
    return {
        posts: Object.values(state.posts.all),
        currentUser: state.session.user,
        users: state.users,
        post: {...defaultPost, ...foundPost}
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPosts: () => dispatch(fetchPosts()),
        fetchUsers: () => dispatch(fetchUsers()),
        addLikeToPost: (id) => dispatch(addLikeToPost(id)),
        removeLikeToPost: (id) => dispatch(removeLikeToPost(id)),
        addCommentToPost: (comment) => dispatch(addCommentToPost(comment))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDisplay)
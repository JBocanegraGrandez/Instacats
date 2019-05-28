import { connect } from 'react-redux';
import { fetchPosts, addLikeToPost, removeLikeToPost} from '../../actions/post_actions';
import { fetchUsers } from '../../actions/user_actions';
import Post from './posts';

const mapStateToProps = (state) => {
    return {
        posts: Object.values(state.posts.all),
        currentUser: state.session.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPosts: () => dispatch(fetchPosts()),
        fetchUsers: () => dispatch(fetchUsers()),
        addLikeToPost: (id) => dispatch(addLikeToPost(id)),
        removeLikeToPost: (id) => dispatch(removeLikeToPost(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post)
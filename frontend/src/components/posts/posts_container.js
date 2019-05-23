import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/post_actions';
import { fetchUsers } from '../../actions/user_actions';
import Post from './posts';

const mapStateToProps = (state) => {
    return {
        posts: Object.values(state.posts.all)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPosts: () => dispatch(fetchPosts()),
        fetchUsers: () => dispatch(fetchUsers())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post)
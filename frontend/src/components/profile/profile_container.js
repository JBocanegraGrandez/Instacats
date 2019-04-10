import { connect } from 'react-redux';
import { fetchUserPosts} from '../../actions/post_actions';
import { fetchUser} from '../../actions/user_actions';
import Profile from './profile';

const mapStateToProps = (state, ownProps) => {
    if (ownProps.match.params.username) {

    }
    return {
      posts: Object.values(state.posts.user),
      currentUser: state.session.user,
      user: state.user
    };
};

const mapDispatchToProps = dispatch => {
    return{
        fetchUserPosts: id => dispatch(fetchUserPosts(id)),
        fetchUser: username => dispatch(fetchUser(username))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
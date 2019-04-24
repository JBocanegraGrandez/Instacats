import { connect } from 'react-redux';
import { fetchUserPosts} from '../../actions/post_actions';
import { fetchUser} from '../../actions/user_actions';
import { logout } from '../../actions/session_actions';
import Profile from './profile';

const mapStateToProps = (state, ownProps) => {
    const defaultUser = {
        description: "",
        email: "loading...",
        followers: [],
        following: [],
        lastname: "loading...",
        name: "loading...",
        username: "loading...",
    }
    return {
      posts: Object.values(state.posts.user),
      currentUser: state.session.user,
      user: {...defaultUser, ...state.user}
    };
};

const mapDispatchToProps = dispatch => {
    return{
        fetchUserPosts: id => dispatch(fetchUserPosts(id)),
        fetchUser: username => dispatch(fetchUser(username)),
        logout: () => dispatch(logout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
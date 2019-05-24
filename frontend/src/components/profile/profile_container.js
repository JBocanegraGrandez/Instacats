import { connect } from 'react-redux';
import { fetchUserPosts} from '../../actions/post_actions';
import { fetchUser, fetchUsers, receiveUser, followUser, unfollowUser} from '../../actions/user_actions';
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
    const defaultUsers = {}
    return {
      posts: Object.values(state.posts.user),
      currentUser: state.session.user,
      user: {...defaultUser, ...state.user},
      users: {...defaultUsers, ...state.users}
    };
};

const mapDispatchToProps = dispatch => {
    const defaultUser = {
        description: "",
        email: "loading...",
        followers: [],
        following: [],
        lastname: "loading...",
        name: "loading...",
        username: "loading...",
    }
    return{
        setUserLoading: () => dispatch(receiveUser({data: defaultUser})),
        fetchUserPosts: id => dispatch(fetchUserPosts(id)),
        fetchUser: username => dispatch(fetchUser(username)),
        fetchUsers: username => dispatch(fetchUsers()),
        followUser: username => dispatch(followUser(username)),
        unfollowUser: username => dispatch(unfollowUser(username)),
        logout: () => dispatch(logout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
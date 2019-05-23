import { connect } from 'react-redux';
import { fetchUserPosts } from '../../actions/post_actions';
import { fetchUser, receiveUser, followUser, unfollowUser } from '../../actions/user_actions';
import { logout } from '../../actions/session_actions';
import FollowOrUnfollowButton from './follow_or_unfollow_button';

// const mapStateToProps = (state, ownProps) => {
//     const defaultUser = {
//         description: "",
//         email: "loading...",
//         followers: [],
//         following: [],
//         lastname: "loading...",
//         name: "loading...",
//         username: "loading...",
//     }
//     return {
//         posts: Object.values(state.posts.user),
//         currentUser: state.session.user,
//         user: { ...defaultUser, ...state.user }
//     };
// };

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
    return {
        setUserLoading: () => dispatch(receiveUser({ data: defaultUser })),
        fetchUserPosts: id => dispatch(fetchUserPosts(id)),
        fetchUser: username => dispatch(fetchUser(username)),
        followUser: username => dispatch(followUser(username)),
        unfollowUser: username => dispatch(unfollowUser(username)),
        logout: () => dispatch(logout())
    };
};

export default connect(null, mapDispatchToProps)(FollowOrUnfollowButton)
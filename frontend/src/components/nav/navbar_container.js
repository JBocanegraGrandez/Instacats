import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { fetchPosts, receiveNewPost } from '../../actions/post_actions'

import NavBar from './navbar';

const mapStateToProps = state => {
    
    return ({
        loggedIn: state.session.isAuthenticated,
        currentUser: state.session.user,
        users: state.users,
        posts: state.posts.all 
    })
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
        receiveNewPost: (post) => dispatch(receiveNewPost(post))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavBar);
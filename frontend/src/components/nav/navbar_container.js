import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';

import NavBar from './navbar';

const mapStateToProps = state => {
    
    return ({
        loggedIn: state.session.isAuthenticated,
        currentUser: state.session.user,
        users: state.users,
        posts: state.posts.all 
    })
};

export default connect(
    mapStateToProps,
    {logout}
)(NavBar);
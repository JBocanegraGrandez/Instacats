import { connect } from 'react-redux';
import { fetchUser } from '../../actions/user_actions';
import EditProfile from './edit_profile';

const mapStateToProps = (state) => ({
    currentUser: state.session.user,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
import { connect } from "react-redux";
import { patchUser } from "../../actions/user_actions";
import { receiveCurrentUser } from "../../actions/session_actions";

import EditPassword from "./edit_password";

const mapStateToProps = state => ({
  currentUser: state.session.user || {}
});

const mapDispatchToProps = dispatch => {
  return {
    patchUser: user => dispatch(patchUser(user)),
    receiveCurrentUser: user => dispatch(receiveCurrentUser(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPassword);

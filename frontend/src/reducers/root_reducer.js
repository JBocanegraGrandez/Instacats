import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer'
import posts from './posts_reducer'
import user from './user_reducer'
import users from './users_reducer'

const RootReducer = combineReducers({
    session,
    errors,
    posts,
    user,
    users
});

export default RootReducer;
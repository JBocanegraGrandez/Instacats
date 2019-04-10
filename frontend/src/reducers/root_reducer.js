import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer'
import posts from './posts_reducer'
import user from './user_reducer'

const RootReducer = combineReducers({
    session,
    errors,
    posts,
    user
});

export default RootReducer;
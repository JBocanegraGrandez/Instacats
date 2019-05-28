import { RECEIVE_USERS, RECEIVE_USER } from '../actions/user_actions';

const UsersReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_USERS:
        newState = action.users.data;
        return newState;
        case RECEIVE_USER:
        newState = action.user.data;
        let updatedUser = {[action.user.data._id]: action.user.data }
            return {...state, ...updatedUser}
        default:
            return state;
    }
};

export default UsersReducer
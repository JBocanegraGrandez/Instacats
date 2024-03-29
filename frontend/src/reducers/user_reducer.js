import { RECEIVE_USER } from '../actions/user_actions';

const UserReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_USER:
        newState = action.user.data;
        if (newState.password){
           
            delete newState.password;
        }
            return newState;
        default:
            return state;
    }
};

export default UserReducer
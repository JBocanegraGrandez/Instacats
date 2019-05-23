import * as APIUtil from "../util/session_api_util";
import jwt_decode from "jwt-decode";

import { getUser, updateUser, addFollower, removeFollower} from "../util/user_api_util";
import { receiveCurrentUser, receiveErrors } from "../actions/session_actions";

export const RECEIVE_USER = 'RECEIVE_USER';

export const receiveUser = user => ({
    type: RECEIVE_USER,
    user
})

export const fetchUser = (username) => dispatch => (
    getUser(username)
        .then(user => dispatch(receiveUser(user)))
        .catch(err => console.log(err))
)

export const patchUser = (userData) => dispatch =>(
    updateUser(userData)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            APIUtil.setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(receiveCurrentUser(decoded))
        })
        .catch(err => {
            dispatch(receiveErrors(err.response.data));
        }) 

)

export const followUser = (username) => dispatch =>(
    addFollower(username)
        .then(res => {
            const { token, targetUser } = res.data;
            localStorage.setItem('jwtToken', token);
            APIUtil.setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(receiveCurrentUser(decoded))
            dispatch(receiveUser({data: targetUser}))
        })
        .catch(err => {
            dispatch(receiveErrors(err.response.data));
        }) 

)

export const unfollowUser = (username) => dispatch =>(
    removeFollower(username)
        .then(res => {
            const { token, targetUser} = res.data;
            localStorage.setItem('jwtToken', token);
            APIUtil.setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(receiveCurrentUser(decoded))
            dispatch(receiveUser({data: targetUser}))
        })
        .catch(err => {
            dispatch(receiveErrors(err.response.data));
        }) 

)
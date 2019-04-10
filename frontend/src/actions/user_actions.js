import { getUser } from "../util/user_api_util";

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
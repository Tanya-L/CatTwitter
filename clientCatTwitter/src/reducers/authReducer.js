import {
    CLEAR_CURRENT_USER,
    SET_CURRENT_USER,
    FOLLOW,
    UNFOLLOW
} from '../Constants'

const initialState = {
    isAuthenticated: false,
    user: null
}

export default function (globalState = initialState, action) {
    switch (action.type) {
        case CLEAR_CURRENT_USER:
            return {
                ...globalState,
                isAuthenticated: false,
                user: null
            }
        case SET_CURRENT_USER:
            return {
                ...globalState,
                isAuthenticated: Object.keys(action.payload).length !== 0,
                user: action.payload
            }
        case FOLLOW:
            return {
                ...globalState,
                user: {
                    ...globalState.user,
                    following: [...globalState.user.following, action.payload]
                }
            }
        case UNFOLLOW:
            return {
                ...globalState,
                user: {
                    ...globalState.user,
                    following: globalState.user.following.filter(item => item !== action.payload)
                }
            }
        default:
            return globalState
    }
}
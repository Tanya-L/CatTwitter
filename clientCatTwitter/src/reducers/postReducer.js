import {ADD_POST, GET_POSTS, LOADING_POSTS} from '../Constants'

const initialState = {
    list: null,
    loading: false,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                list: [action.payload, ...state.list]
            }
        case LOADING_POSTS:
            return {
                ...state,
                loading: true
            }
        case GET_POSTS:
            return {
                ...state,
                loading: false,
                list: action.payload
            }
        default:
            return state
    }
}
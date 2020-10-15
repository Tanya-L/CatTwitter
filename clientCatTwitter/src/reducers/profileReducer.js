import {GET_PROFILE, LOAD_PROFILE} from '../Constants'

const initialState = {
    loading: false,
    user: null
}

export default function (globalState = initialState, action) {
    switch (action.type) {
        case LOAD_PROFILE:
            return {
                ...globalState,
                loading: true
            }
        case GET_PROFILE:
            return {
                ...globalState,
                loading: false,
                user: action.payload
            }
        // case UPDATE_PROFILE:
        //     return {
        //         ...globalState,
        //         loading: false,
        //         user: action.payload
        //     }
        default:
            return globalState
    }
}
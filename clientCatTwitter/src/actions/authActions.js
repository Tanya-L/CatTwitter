import axios from 'axios'
import {CLEAR_CURRENT_USER, GET_ERRORS, getApiURL, SET_CURRENT_USER} from '../Constants'
import setAuthHeader from '../utils/setAuthHeader'

export const loginUser = (userData) => dispatch => {
    axios.post(getApiURL('users/login'), userData)
        .then(res => {
            const {token} = res.data
            localStorage.setItem('jwtToken', token)
            setAuthHeader(token)
            dispatch(getCurrentUser())
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}

export const registerUser = (userData, history) => dispatch => {
    axios.post(getApiURL('users/register'), userData)
        .then(res => history.push('/login'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

export const getCurrentUser = () => dispatch => {
    axios.get(getApiURL('users'))
        .then(res => dispatch(setCurrentUser(res.data)))
}

export const setCurrentUser = (data) => {
    return {
        type: SET_CURRENT_USER,
        payload: data
    }
}

export const clearCurrentUser = () => {
    return {
        type: CLEAR_CURRENT_USER,
        payload: null
    }
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken')
    setAuthHeader()
    dispatch(clearCurrentUser())
}

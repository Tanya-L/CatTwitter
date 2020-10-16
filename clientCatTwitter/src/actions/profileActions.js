import axios from 'axios'
import {FOLLOW, GET_POSTS, GET_PROFILE, getApiURL, LOAD_PROFILE, LOADING_POSTS, UNFOLLOW} from '../Constants'


export const getUserProfile = (userId) => dispatch => {
    dispatch(loadProfile())
    axios.get(`${getApiURL('users/')}${userId}`)
        .then(res => dispatch({
            type: GET_PROFILE,
            payload: res.data
        }))
        .catch(err => console.log(err))
}

export const updateUserProfile = (userData, history) => dispatch => {
    axios.post(`${getApiURL('users/')}${userData.id}`, {userData})
        .then(res => {
            history.push(`/profile/${userData.id}`)
        })
        .catch(err => console.log(err))
}

export const getPostsByUserId = (userId) => dispatch => {
    dispatch(loadPosts())
    axios.get(`${getApiURL('posts/')}${userId}`)
        .then(res => dispatch({
            type: GET_POSTS,
            payload: res.data
        }))
        .catch(err => console.log(err))
}

export const followUser = (userId) => dispatch => {
    axios.post(getApiURL('users/follow'), {userId})
        .then(res => dispatch({
            type: FOLLOW,
            payload: res.data.userId
        }))
        .catch(err => console.log(err))
}

export const unfollowUser = (userId) => dispatch => {

    axios.post(getApiURL('users/unfollow'), {userId})
        .then(res => dispatch({
            type: UNFOLLOW,
            payload: res.data.userId
        }))
        .catch(err => console.log(err))
}

export const searchUser = (searchData, history) => dispatch => {
    axios.post(getApiURL('users/search'), searchData)
        .then(res => {
            history.push(`/profile/${res.data.userId}`)
        })
        .catch(err => history.push('/search/notfound'))
}

export const loadProfile = () => {
    return {
        type: LOAD_PROFILE
    }
}

export const loadPosts = () => {
    return {
        type: LOADING_POSTS
    }
}

import axios from 'axios'
import {ADD_POST, GET_POSTS, getApiURL, LOADING_POSTS} from '../Constants'

export const addPost = postData => dispatch => {
    axios.post(getApiURL('posts/add'), postData)
        .then(res => dispatch({
            type: ADD_POST,
            payload: res.data
        }))
        .catch(err => console.log(err))
}

export const deletePost = (key, history) => dispatch => {
    axios.delete(getApiURL('posts/') + key)
        .then(res => history.go(0))
        .catch(err => console.log(err))
}

export const getPosts = () => dispatch => {
    dispatch(loadPosts)
    axios.get(getApiURL('posts'))
        .then(res => dispatch({
            type: GET_POSTS,
            payload: res.data
        }))
        .catch(err => console.log(err))
}

export const getPostsByFollowingUsers = () => dispatch => {
    axios.get(getApiURL('posts/following'))
        .then(res => dispatch({
            type: GET_POSTS,
            payload: res.data
        }))
        .catch(err => console.log(err))
}

export const loadPosts = () => {
    return {
        type: LOADING_POSTS
    }
}

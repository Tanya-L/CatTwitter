import {CATTWITTER_HOST} from './Config'

export const GET_ERRORS = 'GET_ERRORS'

export const CLEAR_CURRENT_USER = 'CLEAR_CURRENT_USER'
export const SET_CURRENT_USER = 'SET_CURRENT_USER'

export const LOADING_POSTS = 'LOADING_POSTS'
export const GET_POSTS = 'GET_POSTS'
export const ADD_POST = 'ADD_POST'

export const LOAD_PROFILE = 'LOAD_PROFILE'
export const GET_PROFILE = 'GET_PROFILE'
//export const UPDATE_PROFILE = 'EDIT_PROFILE'

export const FOLLOW = 'FOLLOW'
export const UNFOLLOW = 'UNFOLLOW'


export function getApiURL(p) {
    return "https://qd0xfqszj5.execute-api.eu-north-1.amazonaws.com/prod/api/" + p;
        // "http://" +CATTWITTER_HOST + ":5000/api/" + p;
}

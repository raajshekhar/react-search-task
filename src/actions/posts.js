import * as actionTypes from '../constants/actionTypes'
import axiosInstance from '../axiosInstance';

export const PostsSuccess = (posts) => {
    return {
        type: actionTypes.SET_POSTS,
        posts
    }
}

export const PostsFail = (error) => {
    return {
        type: actionTypes.POST_FAIL,
        error
    }
}

export const PostsSendRequest = (data) => {
    return dispatch => {
        //dispatch(PostsStart())
        axiosInstance({url:'/posts.json'})
            .then((response) => {
              dispatch(PostsSuccess(response.data.posts))
            })
            .catch((error) => {
              dispatch(PostsFail(error))
            })
    }
}

export const setSelectedPost = (postIndex) => {
    return {
        type: actionTypes.SELECTED_POST,
        postIndex
    }
}

export const updatePost = (userObj) => {
    return dispatch => {
        dispatch({
            type: actionTypes.EDIT_POST,
            userObj
        })
        dispatch(setSelectedPost(userObj.id));
    }
};

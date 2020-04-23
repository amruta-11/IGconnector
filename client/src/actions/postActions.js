//@desc This file contains all the actions that will be implemented on the Post components
import
 {GET_USER_POST, 
  GET_ERRORS,
  GET_ALL_POST} from './types';
import axios from 'axios';

//Get Post by Username & loading them in profile component(ProfilePost)
export const getPostByUsername = username => dispatch => {
  axios
    .get('/api/post/username/' + username)
    .then(res =>
      dispatch({
        type: GET_USER_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_USER_POST,
        payload: null
      })
    );
};

//Get all the post on the IG connector
export const getAllPost = () => dispatch => {
  axios
    .get('/api/post/')
    .then(res =>
      dispatch({
        type: GET_ALL_POST,
        payload: res.data
      }) 
      )
      .catch(err => 
        dispatch({
          type: GET_ALL_POST,
          payload: null
        }))
}

//Create Post - Action
export const createPost = (postData, history) => dispatch => {
  axios
    .post('/api/post', postData)
    .then(res => history.push('/profile/'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


//Add a like
export const likePost = id => dispatch => {
  axios
    .post('/api/post/like/'+ id)
    .then(res => dispatch(getAllPost()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Unlike a Post
export const unlikePost = id => dispatch => {
  axios
    .post('/api/post/unlike/'+ id)
    .then(res => dispatch(getAllPost()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


//Add comment to the Post - Action
export const addComment = (commentData) => dispatch => {
  axios
    .post('/api/post/comment/' + commentData.postid, commentData)
    .then(res => dispatch(getAllPost()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

import {GET_USER_POST, GET_ERRORS} from './types';
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


// Create Post - Action
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



import {GET_ERRORS, GET_PROFILE, PROFILE_LOADING, GET_USER_POST} from './types';
import axios from 'axios';


// Create or Edit Profile Action
export const editProfile = (profileData, history) => dispatch => {
    axios
      .post('/api/profile/edit', profileData)
      .then(res => history.push('/profile/'))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };


// Get profile by username
export const getProfileByUsername = username => dispatch => {
  axios
    .get('/api/profile/username/' + username)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};


//Get current user's Post & loading them in profile component
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




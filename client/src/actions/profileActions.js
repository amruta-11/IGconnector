//@desc This file contains all the actions that will be implemented on the Profile components

import {GET_ERRORS, GET_PROFILE} from './types';
import axios from 'axios';

// Edit Profile Action
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

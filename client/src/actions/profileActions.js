//@desc This file contains all the actions that will be implemented on the Profile components

import 
{GET_ERRORS, 
GET_PROFILE, 
GET_FOLLOWERS, 
GET_FOLLOWING} 
from './types';
import axios from 'axios';


// Edit Profile Action
export const editProfile = (profileData, username, history) => dispatch => {
    axios
      .post('/api/profile/edit', profileData)
      .then(res => history.push('/profile/' + username))
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

// Get Followers by username
export const getFollowers = username => dispatch => {
  axios
    .get('/api/profile/followers/' + username)
    .then(res =>
      dispatch({
        type: GET_FOLLOWERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_FOLLOWERS,
        payload: null
      })
    );
};

// Get Following by username
export const getFollowing = username => dispatch => {
  axios
    .get('/api/profile/following/' + username)
    .then(res =>
      dispatch({
        type: GET_FOLLOWING,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_FOLLOWING,
        payload: null
      })
    );
};


//Follow a User
export const followUser = username => dispatch => {
  axios
    .post('/api/profile/follow/' + username)
    .then(res => dispatch(getProfileByUsername(username)))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


//Unfollow a User
export const unfollowUser = username => dispatch => {
  axios
    .post('/api/profile/unfollow/' + username)
    .then(res => dispatch(getProfileByUsername(username)))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

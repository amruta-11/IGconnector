//@desc This file contains all the actions that will be implemented on the Authentication components like Register, Log in, Log Out

import {SET_CURRENT_USER, GET_ERRORS, GET_USERSLIST} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

//Register Action
export const registerUser = (userData, history) => dispatch => {
    axios
        .post('api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }
            ))
}

//Login Action
//This action will get the user token & store it in local storage
export const loginUser = userData => dispatch => {
    axios
        .post('api/users/login', userData)
        .then(res => {
        // 1. Saving the token in const 'token'
        const {token} = res.data;

        // 2. Set the token to LocalStorage- Key value pair
        localStorage.setItem('jwtToken', token);

        // 3. Set the token to auth header
        setAuthToken(token);

        //Decode the token to get user data
        //Install jwt-decode on client side
        var decoded = jwt_decode(token);

        //Set current user & save user to redux
        dispatch ({
            type: SET_CURRENT_USER,
            payload: decoded
            })
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }
            ));
}

//Logout Action
export const logoutUser = (history) => dispatch => {
    //Remove the token stored in local storage
    localStorage.removeItem('jwtToken');

    //Remove from the auth header
    setAuthToken(false);

    //Remove from the redux store
    dispatch ({
        type: SET_CURRENT_USER,
        //Empty Payload
        payload: {}
        });
    
    history.push('/login');
} 


//To get User list
export const getUserList = () => dispatch => {
    axios
        .get('api/users/')
        .then(res =>  
            dispatch({
            type: GET_USERSLIST,
            payload: res.data
        })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }
            ))
}
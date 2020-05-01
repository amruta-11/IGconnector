//This file will be the combination of all the reducers that will write to the store
//combineReducers is a class found in Redux which will allow us to combine different reducers into one component that can be pass to the store

import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';

export default combineReducers({
    //Below are all the reducers that needs to be combined
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer,
    post: postReducer
})

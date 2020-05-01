//Only reducers can write the data to the store
//Reducers define what data to be written into the store
//This profile reducers will listen & pick up the dispatches with 'GET_PROFILE, GET_FOLLOWERS, GET_FOLLOWING' as their asction type 
import {GET_PROFILE, GET_FOLLOWERS, GET_FOLLOWING} from '../actions/types';

const initialState = {
    profile: null,
};

export default function(state = initialState, action){
    switch(action.type){
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload
            };
        case GET_FOLLOWERS:
            return {
                ...state,
                followers: action.payload
            };
        case GET_FOLLOWING:
            return {
                ...state,
                following: action.payload
            };
        default:
            //the reducer 'returns' to the store
            //Here the authReducer will write the state to the store
            return state;
    }
}
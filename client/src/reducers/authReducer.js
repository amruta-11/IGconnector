//Only reducers can write the data to the store
//Reducers define what data to be written into the store
//'authReducer' will write the authentication info into the store

import {SET_CURRENT_USER, GET_USERSLIST} from '../actions/types';
import isEmpty from '../validation/isEmpty';

const initialState = {
    isAuthenticated: false,
    user: {}
};

//This function needs to be called when anyone wants to change the state of the authReducer
export default function(state = initialState, action){
    switch(action.type){
        case SET_CURRENT_USER:
            return{
                ...state,
                //Check if payload is empty or not
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        // case GET_USERSLIST:
        //     return{
        //         ...state,
        //         userlist: action.payload
        //     }
        default:
            //the reducer 'returns' to the store
            //Here the authReducer will write the state to the store
            return state;
    }
}
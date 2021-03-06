//Only reducers can write the data to the store
//Reducers define what data to be written into the store
//'authReducer' will write the authentication info into the store 

import {SET_CURRENT_USER, GET_USERSLIST} from '../actions/types';
import isEmpty from '../validation/isEmpty';

//The initially the state is set to be empty
//Actions - are plain object that represents an intention to change the state & they are the only way to get data into the store.

const initialState = {
    isAuthenticated: false,
    user: {}
};

//This case SET_CURRENT_USER needs to be called when anyone wants to change the state of the authReducer
export default function(state = initialState, action){
    switch(action.type){
        case SET_CURRENT_USER:
            return{
                ...state,
                //Check if payload is empty or not
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        default:
            //the reducer 'returns' to the store
            //Here the authReducer will write the state to the store
            return state;
    }
}
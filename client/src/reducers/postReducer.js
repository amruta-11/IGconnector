//Only reducers can write the data to the store
//Reducers define what data to be written into the store
import {GET_USER_POST, GET_ALL_POST} from '../actions/types';

const initialState = {
    posts: null
};

export default function(state = initialState, action){
    switch(action.type){
        case GET_USER_POST:
        case GET_ALL_POST:
            return {
                ...state,
                posts: action.payload
            };
        default:
            //the reducer 'returns' to the store
            //Here the authReducer will write the state to the store
            return state;
    }
}
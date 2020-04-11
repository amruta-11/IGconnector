//Only reducers can write the data to the store
//Reducers define what data to be written into the store
import {GET_PROFILE} from '../actions/types';

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
        default:
            //the reducer 'returns' to the store
            //Here the authReducer will write the state to the store
            return state;
    }
}
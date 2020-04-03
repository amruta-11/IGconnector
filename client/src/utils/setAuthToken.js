//Axios makes all the API calls
//After the user logs in all of the axios call should contain the token in auth header
//After the user logs out axios should remove the token from header
import axios from 'axios';


//write a function setAuthToken
//pass token to it
// if there is user i.e there is token then set the token to Authorization header
const setAuthToken = token => {
    if (token){
        //This applies the token to all call made by axios after login
        axios.defaults.headers.common["Authorization"] = token;
    }
    //if there is no user then delete the token
    else{
        //Delete the token
        delete axios.defaults.headers.common['Authorization'];
    }
}


export default setAuthToken;

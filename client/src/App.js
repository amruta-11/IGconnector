//Libraries & Fuctions
import React, { Component } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Provider} from 'react-redux'; //Provider is other name for store
import store from './store';
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import {SET_CURRENT_USER} from './actions/types';
import {logoutUser} from './actions/authActions'


//Components
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Profile from "./components/profile/Profile";
import EditProfile from "./components/edit-profile/EditProfile";
import CreatePost from "./components/create-post/CreatePost";
import Feed from "./components/feed/Feed";
import PrivateRoute from "./components/common/PrivateRoute";


//Check if there is a token
if (localStorage.jwtToken){
  //Set the auth header to token
  setAuthToken(localStorage.jwtToken);
  //decode
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded
  })
  //Check if token is expired
  const currentTime = Date.now()/1000;
  if (decoded.exp < currentTime){
    //Logout because token is expired
    store.dispatch(logoutUser());
    //redirect
    window.location.href = '/login';
  }
}


class App extends Component {
  render() {
    return(
      //This implies that store will be used by all the components
      <Provider store={store}> 
      <Router>
      <div>
        <Route path='/' component={NavBar} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/(|login)" component={Login} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/post/create" component={CreatePost} />
        <PrivateRoute exact path="/feed" component={Feed} />
        <Switch>
        <PrivateRoute exact path="/profile/edit/" component={EditProfile} />
        <PrivateRoute exact path="/profile/:username" component={Profile} />
        </Switch>
        <Footer />
      </div>
      </Router>
      </Provider>
    )
  }
}


export default App;

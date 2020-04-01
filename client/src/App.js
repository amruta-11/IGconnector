//Libraries & Fuctions
import React, { Component } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Provider} from 'react-redux'; //Provider is other name for store
import store from './store';


//Components
import NavBar from "./components/layout/NavBar"
import Footer from "./components/layout/Footer"
import Register from "./components/auth/Register"
import Login from "./components/auth/Login"

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
        <Footer />
      </div>
      </Router>
      </Provider>
    )
  }
}


export default App;

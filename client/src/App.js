//Libraries & Fuctions
import React, { Component } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


//Components
import NavBar from "./components/layout/NavBar"
import Footer from "./components/layout/Footer"
import Register from "./components/auth/Register"
import Login from "./components/auth/Login"

class App extends Component {
  render() {
    return(
      <Router>
      <div>
        <Route path='/' component={NavBar} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Footer />
      </div>
      </Router>
    )
  }
}


export default App;

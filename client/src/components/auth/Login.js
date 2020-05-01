//@desc
//Allows user to login into the account. Uses Email & Password - done two-way binding
//After getting the data into the state oject, the user data is passed to the 'loginUser' Action
//This action fires the axios call & runs the post-'api/users/login' api
//It sends the user data in response, store it in state & set the current user
//It also sends any errors back, if any & to display errors are mapped to props

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import {connect} from 'react-redux'; //For connecting UI component to the store & actions 
import {loginUser} from '../../actions/authActions';
import PropTypes from 'prop-types'; //For loading component with required objects & function

class Login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }
    //onChange Event
    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

     //React lifecycle Method
     componentWillReceiveProps(nextProps)
     {
         if (nextProps.auth.isAuthenticated){
             this.props.history.push('/feed')
         }
         if(nextProps.errors){
             this.setState({errors:nextProps.errors})
         }
     }

    //onSubmit Event
    onSubmit(e){
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password
          };

        this.props.loginUser(user);     
    }


    render() {
        var errors = this.state.errors;

        return (
            <main id="login">
            <div className="login__column">
                <img src={require('../../img/phoneImage.png')} className="login__phone" />
            </div>
            <div className="login__column">
                <div className="login__box">
                    <img src={require('../../img/chitraflogo.png')} className="login__logo" />
                    
                    <form onSubmit = {this.onSubmit} 
                    method="get" 
                    className="login__form">
                        
                        <input type="text"
                        className= {classnames("form-control form-control-lg", {
                            'is-invalid': errors.email
                        })} 
                        name="email" 
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.onChange}
                        />
                        {errors.email && (
                            <div className="invalid-feedback">{errors.email}</div>
                        )}


                        <input type="password"
                        className= {classnames("form-control form-control-lg", {
                            'is-invalid': errors.password
                        })} 
                        name="password" 
                        placeholder="Password"
                        value= {this.state.password}
                        onChange={this.onChange}
                        />
                        {errors.password && (
                            <div className="invalid-feedback">{errors.password}</div>
                        )}

                        
                        <input type="submit" 
                        value="Log in" />
                    </form>
                </div>

                <div className="login__box">
                <span>Don't have an account?</span> 
                <Link to="/register"> Sign up</Link>
                </div>
                
                <div className="login__box--transparent">
                    <span>Get the app.</span>
                    <div className="login__appstores">
                        <img src={require('../../img/ios.png')} className="login__appstore" 
                        alt="Apple appstore logo" 
                        title="Apple appstore logo" />
                        <img src={require('../../img/android.png')} className="login__appstore" 
                        alt="Android appstore logo" 
                        title="Android appstore logo" />
                    </div>
                </div>
            </div>
        </main>
        )
    }
}


Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}


const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, {loginUser})(Login);
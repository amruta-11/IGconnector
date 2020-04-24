import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import classnames from 'classnames';
import {connect} from 'react-redux'; //For connecting UI component to the store & actions 
import {registerUser} from '../../actions/authActions';
import PropTypes from 'prop-types'; //For loading component with required objects & function
import {withRouter} from 'react-router-dom'; //For routing between one component to other



class Register extends Component {
    //Constructor is needed to build an object of that class
    constructor(){
        super(); //Parent class's constructor
        //This state object will store all the data in this components local state 
        this.state = {
            name: '',
            email: '',
            username: '',
            password: '',
            errors: {} //Errors will be an object
        };
        
        //this.onChange var name will call onChange function
        this.onChange = this.onChange.bind(this);
        //this.onSubmit var name will call onSubmit function
        this.onSubmit = this.onSubmit.bind(this);
    }
    //onChange Event
    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    //onSubmit Event
    onSubmit(e){
        e.preventDefault();
        
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        };

        //Here we will be triggering the 'registerUser' Action & passing the newUser to it & history property
        this.props.registerUser(newUser, this.props.history); 
    }

    //React lifecycle Method
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors:nextProps.errors})
        }
    }

    render() {
        var errors = this.state.errors;
        const {user} = this.props.auth;

        return (
            <main id="signup">
            <div className="signup__column">

                <div className="signup__box">
                    <img src={require('../../img/chitraflogo.png')} className="insta__logo" />
                    <h3 className="signup__logo">Sign up to see photos and videos from your friends.</h3>
                    <form onSubmit = {this.onSubmit}
                    // Onsubmit function - to save the data in DB & fire axios 
                    method="get" className="signup__form">
                        
                        <input type="text"
                        className= {classnames("form-control form-control-lg", {
                            'is-invalid': errors.name
                        })}
                        name="name"
                        //Binding the value
                        value= {this.state.name}
                        //onChange event will allow you to change the value
                        onChange={this.onChange}
                        placeholder="Full Name"/>
                        {errors.name && (
                            <div className="invalid-feedback">{errors.name}</div>
                        )}

                        <input type="text"
                        className= {classnames("form-control form-control-lg", {
                            'is-invalid': errors.email
                        })} 
                        name="email"
                        //Binding the value
                        value= {this.state.email}
                        //onChange event will allow you to change the value
                        onChange={this.onChange}
                        placeholder="Email"/>
                         {errors.email && (
                            <div className="invalid-feedback">{errors.email}</div>
                        )}

                        <input type="text"
                        className= {classnames("form-control form-control-lg", {
                            'is-invalid': errors.username
                        })}
                        name="username"
                        //Binding the value
                        value= {this.state.username}
                        //onChange event will allow you to change the value
                        onChange={this.onChange}
                        placeholder="Username"/>
                         {errors.username && (
                            <div className="invalid-feedback">{errors.username}</div>
                        )}

                        <input type="password"
                        className= {classnames("form-control form-control-lg", {
                            'is-invalid': errors.password
                        })}
                        name="password"
                        //Binding the value
                        value= {this.state.password}
                        //onChange event will allow you to change the value
                        onChange={this.onChange}
                        placeholder="Password"/>
                         {errors.password && (
                            <div className="invalid-feedback">{errors.password}</div>
                        )}
                        
                        <input type="submit" value="Sign Up"/>
                    </form>
                </div>
                <div className="signup__box">
                <span>Already have an account?</span> 
                <Link to="/login"> Log In</Link>
                </div>
                <div className="signup__box--transparent">
                    <span>Get the app</span>
                    <div className="signup__appstores">
                        <img src={require('../../img/ios.png')} className="signup__appstore" alt="Apple appstore logo" title="Apple appstore logo" />
                        <img src={require('../../img/android.png')} className="signup__appstore" alt="Android appstore logo" title="Android appstore logo" />
                    </div>
                </div>
            </div>
        </main>

        )
    }
}

//Here we are making sure that 'registerUser' & 'auth' is available for Register component to load
Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, {registerUser})(withRouter(Register));
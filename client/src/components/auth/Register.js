import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import classnames from 'classnames';


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

        axios
            .post('api/users/register', newUser)
            .then(res => console.log(res.data))
            .catch(err => this.setState({errors: err.response.data}))
    }

    render() {

        var errors = this.state.errors;

        return (
            <main id="signup">
            <div className="signup__column">
                <div className="signup__box">
                    <img src={require('../../img/chitraflogo.png')} className="insta__logo" />
                    <img src={require('../../img/signuplogo.PNG')} className="signup__logo"/>
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
                <Link to="/login">Log In</Link>
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


export default Register;
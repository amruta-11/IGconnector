import React, { Component } from 'react';


class Register extends Component {
    render() {
        return (
            <main id="signup">
            <div class="signup__column">
                <div class="signup__box">
                    <img src={require('../../img/chitraflogo.png')} class="insta__logo" />
                    <img src={require('../../img/signuplogo.PNG')} class="signup__logo"/>
                    <form action="feed.html" method="get" class="signup__form">
                        <input type="text" 
                        name="name" 
                        placeholder="Full Name"/>

                        <input type="text" 
                        name="email" 
                        placeholder="Email"/>

                        <input type="text" 
                        name="username" 
                        placeholder="Username"/>

                        <input type="password" 
                        name="password" 
                        placeholder="Password"/>
                        
                        <input type="submit" value="Sign Up"/>
                    </form>
                </div>
                <div class="signup__box">
                <span>Already have an account?</span> 
                <a href="login.html">Log In</a>
                </div>
                <div class="signup__box--transparent">
                    <span>Get the app</span>
                    <div class="signup__appstores">
                        <img src={require('../../img/ios.png')} class="signup__appstore" alt="Apple appstore logo" title="Apple appstore logo" />
                        <img src={require('../../img/android.png')} class="signup__appstore" alt="Android appstore logo" title="Android appstore logo" />
                    </div>
                </div>
            </div>
        </main>

        )
    }
}


export default Register;
import React, { Component } from 'react';


class Login extends Component {
    render() {
        return (
            <main id="login">
            <div class="login__column">
                <img src={require('../../img/phoneImage.png')} class="login__phone" />
            </div>
            <div class="login__column">
                <div class="login__box">
                    <img src={require('../../img/chitraflogo.png')} class="login__logo" />
                    <form action="feed.html" method="get" class="login__form">
                        
                        <input type="text" 
                        name="email" 
                        placeholder="Email" 
                        required />
                        
                        <input type="password" 
                        name="password" 
                        placeholder="Password" 
                        required />
                        
                        <input type="submit" 
                        value="Log in" />
                    </form>
                </div>

                <div class="login__box">
                <span>Don't have an account?</span> 
                <a href="register.html">Sign up</a>
                </div>
                
                <div class="login__box--transparent">
                    <span>Get the app.</span>
                    <div class="login__appstores">
                        <img src={require('../../img/ios.png')} class="login__appstore" 
                        alt="Apple appstore logo" 
                        title="Apple appstore logo" />
                        <img src={require('../../img/android.png')} class="login__appstore" 
                        alt="Android appstore logo" 
                        title="Android appstore logo" />
                    </div>
                </div>
            </div>
        </main>
        )
    }
}


export default Login;
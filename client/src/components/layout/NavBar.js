import React, { Component } from 'react'

class NavBar extends Component {
    render() {
        //We don't want Navbar for Register & login Page
        const location = this.props.location;
        if(location.pathname === '/register' || location.pathname === '/login') {
            return null;
        }

        return (
            <nav className="navigation">
                <div className="navigation__column">
                    <a href="feed.html">
                    <img src={require('../../img/chitraflogo.png')}/>
                    </a>
                </div>
                <div className="navigation__column">
                    <i className="fa fa-search"></i>
                    <input type="text" placeholder="Search"/>
                </div>
                <div className="navigation__column">
                    <ul className="navigations__links">
                        <li className="navigation__list-item">
                            <a href="#" className="navigation__link">
                                <i className="fa fa-heart-o fa-lg"></i>
                            </a>
                        </li>
                        <li className="navigation__list-item">
                            <a href="profile.html" className="navigation__link">
                                <i className="fa fa-user-o fa-lg"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}


export default NavBar;
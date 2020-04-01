import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class NavBar extends Component {
    render() {
        //We don't want Navbar for Register & login Page
        const location = this.props.location;
        if(location.pathname === '/register' || location.pathname === '/login' || location.pathname === '/') {
            return null;
        }

        return (
            //Logo
            <nav className="navigation">
                <div className="navigation__column">
                    <Link to="/feed">
                    <img src={require('../../img/chitraflogo.png')}/>
                    </Link>
                </div>
                <div className="navigation__column">
                    <i className="fa fa-search"></i>
                    <input type="text" placeholder="Search"/>
                </div>
                <div className="navigation__column">
                    <ul className="navigations__links">
                        <li className="navigation__list-item">
                            <Link to="/notify" className="navigation__link">
                                <i className="fa fa-heart-o fa-lg"></i>
                            </Link>
                        </li>
                        <li className="navigation__list-item">
                            <Link to="/profile" className="navigation__link">
                                <i className="fa fa-user-o fa-lg"></i>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}


export default NavBar;
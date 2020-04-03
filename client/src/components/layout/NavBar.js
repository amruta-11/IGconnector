import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {logoutUser} from '../../actions/authActions';
import {connect} from 'react-redux'; //For connecting UI component to the store & actions
import PropTypes from 'prop-types';


class NavBar extends Component {
    
    onLogoutClick(e){
        e.preventDefault();
        this.props.logoutUser();
    }

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
                        <li className="navigation__list-item">
                        <a
                            onClick={this.onLogoutClick.bind(this)}
                            className="navigation__link">
                        <Link to="/login" className="navigation__link">
                        <i className="fas fa-sign-out-alt"></i>
                        </Link>
                        </a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}


NavBar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}


const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps, {logoutUser})(NavBar);
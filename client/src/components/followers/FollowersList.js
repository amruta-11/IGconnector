//@desc
//This component will display all the follwers of the given user
//getFollwers(param - username) Action which will disatch the GET_FOLLOWERS & fire axios & run the API
//Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from "../common/Spinner";
import { Link } from 'react-router-dom';
// Actions
import {getFollowers} from '../../actions/profileActions';


class FollowersList extends Component {
    render() {
        const followers = this.props.mappedFollowers;
        var FollowersArray = [];

        if (followers === null || followers === undefined) {
            return <Spinner />;
        }

        if(followers.length === 0){
            return <main id="explore"><h2>No followers yet.</h2></main>
        }

        for(var i = 0; i < followers.length; i++) {
            //follwersJSX acts like a framework to make a list
            var followersJSX = 
            <li class="explore__user">
                <div class="explore__user-column">
                    <img src={followers[i].avatar} class="explore__avatar"/>
                    <div class="explore__info">
                        <Link to={"/profile/" + followers[i].username}
                        class="explore__username">{followers[i].username}</Link>
                        <span class="explore__full-name">{followers[i].name}</span>
                    </div>
                </div>
            </li>
            FollowersArray.push(followersJSX);
        }
        return (
            <main id="explore">
            <ul class="explore__users">
                {FollowersArray}
            </ul>
            </main>
        )
    }
    componentDidMount() {
        let usernameLocal = null;
        //Checking for username
        //Is it from params?
        //Is it for loggedIn User
        if (this.props.match.params.username) {
          usernameLocal = this.props.match.params.username;
        } else if (this.props.username) {
          usernameLocal = this.props.username;
        }
  
        if (usernameLocal !== null) {
          this.props.getFollowers(usernameLocal);
        }       
      }
}

FollowersList.propTypes = {
    getFollowers: PropTypes.func.isRequired,
};

//Mapped the Follwers Data into the state from Profile (Profile will be already loaded)
const mapStateToProps = state => ({
    mappedFollowers: state.profile.followers,
});

export default connect(mapStateToProps, {getFollowers})(FollowersList);
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

                {/* Follow Button Removed
                <div class="explore__user-column">
                    <button>Follow</button>
                </div> */}
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
const mapStateToProps = state => ({
    mappedFollowers: state.profile.followers,
});

export default connect(mapStateToProps, {getFollowers})(FollowersList);
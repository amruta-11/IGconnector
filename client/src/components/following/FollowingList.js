import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from "../common/Spinner";
// Actions
import {getFollowing} from '../../actions/profileActions';
import { Link } from 'react-router-dom';

class FollowingList extends Component {
    render() {
        const following = this.props.mappedFollowing;
        var FollowingArray = [];

        if (following === null || following === undefined) {
            return <Spinner />;
        }

        if(following.length === 0){
            return <main id="explore"><h2>No following yet.</h2></main>
        }

        for(var i = 0; i < following.length; i++) {
            var followingJSX = 
            <li class="explore__user">
                <div class="explore__user-column">
                    <img src={following[i].userId.avatar} class="explore__avatar"/>
                    <div class="explore__info">
                        <Link to={"/profile/" + following[i].userId.username}
                        class="explore__username">{following[i].userId.username}</Link>
                        <span class="explore__full-name">{following[i].userId.name}</span>
                    </div>
                </div>
                {/* Remove Follow button 
                <div class="explore__user-column">
                    <button>Follow</button>
                </div> */}
            </li>
            FollowingArray.push(followingJSX);
        }
        return (
            <main id="explore">
            <ul class="explore__users">
                {FollowingArray}
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
          this.props.getFollowing(usernameLocal);
        }       
      }
}

FollowingList.propTypes = {
    getFollowing: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
    mappedFollowing: state.profile.following,
});

export default connect(mapStateToProps, {getFollowing})(FollowingList);
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'; 
import PropTypes from 'prop-types';

//Actions
import {followUser} from '../../actions/profileActions';
import {unfollowUser} from '../../actions/profileActions';

class ProfileInfoOther extends Component {
    // If the user is already following then show 'unfollow' else show 'follow'
    onFollowClick(e){
        e.preventDefault();
        this.props.followUser(this.props.profile.userId.username);
    }

    onUnfollowClick(e){
        e.preventDefault();
        this.props.unfollowUser(this.props.profile.userId.username);
    }

    render() {
        const profile = this.props.profile;
        const numberOfPosts = this.props.numberOfPosts;
        const id = this.props.id;

        var followUnfollowButton = '';
        if (profile.followers.includes(id)) {
            followUnfollowButton = <Link onClick={this.onUnfollowClick.bind(this)}>Unfollow</Link>
        } else {
            followUnfollowButton = <Link onClick={this.onFollowClick.bind(this)}>Follow</Link>
        }

        return (
// Profile Component
        <header class="profile__header">
            <div class="profile__column">
                <img 
                src={profile.userId.avatar}
                alt=""/>
            </div>
            <div class="profile__column">
                <div class="profile__title">
                    <h3 class="profile__username">{profile.userId.username}</h3>
                    {followUnfollowButton}
                </div>

{/* <!--Followers & Following--> */}
                <ul class="profile__stats">
                    <li class="profile__stat">
                        <span class="stat__number">{numberOfPosts}</span> 
                        Posts
                    </li>
                    <li class="profile__stat">
                        <span class="stat__number">{profile.followers.length}</span>
                        <Link to={"/profile/followers/" + profile.userId.username}>Followers</Link>
                    </li>
                    <li class="profile__stat">
                        <span class="stat__number">{profile.following.length}</span>
                        <Link to={"/profile/following/" + profile.userId.username}>Following</Link>
                    </li>
                </ul>

{/* <!--Bio--> */}
                <p class="profile__bio">
                    <span class="profile__full-name">{profile.userId.name}</span>
                    <br/>
                    {profile.bio}
                    <a href="{profile.website}">{profile.website}</a>
                </p>
            </div>
        </header>
        )
    }
}


ProfileInfoOther.propTypes = {
    followUser: PropTypes.func.isRequired,
    unfollowUser: PropTypes.func.isRequired,
}


export default connect(null, {followUser, unfollowUser})(ProfileInfoOther);
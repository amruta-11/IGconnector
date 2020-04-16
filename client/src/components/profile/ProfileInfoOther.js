import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProfileInfoOther extends Component {
    render() {
        const profile = this.props.profile;
        const numberOfPosts = this.props.numberOfPosts;

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
                    <h3 class="profile__username">
                        {profile.userId.username}
                    </h3>
                    <Link to="/profile/">
                        Follow
                    </Link>
                </div>
{/* <!--Followers & Following--> */}
                <ul class="profile__stats">
                    <li class="profile__stat">
                        <span class="stat__number">
                            {numberOfPosts}
                            </span> 
                            Posts
                    </li>
                    <li class="profile__stat">
                        <span class="stat__number">
                            {profile.followers.length}
                            </span>
                            Followers
                    </li>
                    <li class="profile__stat">
                        <span class="stat__number">
                            {profile.following.length}
                            </span>
                            Following
                    </li>
                </ul>

{/* <!--Bio--> */}
                <p class="profile__bio">
                    <span class="profile__full-name">
                        {profile.userId.name}
                    </span>
                    <br/>
                    {profile.bio}
                    <a href="{profile.website}">
                        {profile.website}
                        </a>
                </p>
            </div>
        </header>
        )
    }
}

export default ProfileInfoOther;